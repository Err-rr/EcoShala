import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  School,
} from 'lucide-react';
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signupStudent, signupTeacher } from "@/lib/auth";
import { getCurrentUserProfile } from "@/lib/userService";
import { toast } from "sonner";

type StudentForm = {
  name: string;
  email: string;
  institution: string;
  studentClass: string;
  rollNo: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

type TeacherForm = {
  name: string;
  email: string;
  institution: string;
  teachingClasses: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export default function Signup() {
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Student form state
  const [studentData, setStudentData] = useState<StudentForm>({
    name: '',
    email: '',
    institution: '',
    studentClass: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Teacher form state
  const [teacherData, setTeacherData] = useState<TeacherForm>({
    name: '',
    email: '',
    institution: '',
    teachingClasses: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const mapError = (errorValue: unknown): string => {
    if (errorValue instanceof FirebaseError) {
      switch (errorValue.code) {
        case "auth/email-already-in-use":
          return "That email is already registered.";
        case "auth/invalid-email":
          return "Please enter a valid email address.";
        case "auth/weak-password":
          return "Please use a stronger password with at least 6 characters.";
        case "auth/operation-not-allowed":
          return "Email/password authentication is not enabled.";
        case "auth/popup-closed-by-user":
          return "Google sign-in was closed before it finished.";
        default:
          return "We couldn't create your account right now.";
      }
    }

    if (errorValue instanceof Error) {
      return errorValue.message;
    }

    return "We couldn't create your account right now.";
  };

  const toggleUserType = () => {
    setIsTeacher(!isTeacher);
  };

  const validateStudentForm = () => {
    const { name, email, institution, studentClass, rollNo, password, confirmPassword, agreeTerms } = studentData;
    return name.trim() !== '' && 
           email.trim() !== '' && 
           institution.trim() !== '' && 
           studentClass !== '' && 
           rollNo.trim() !== '' && 
           password.trim() !== '' && 
           confirmPassword.trim() !== '' && 
           password === confirmPassword && 
           agreeTerms;
  };

  const validateTeacherForm = () => {
    const { name, email, institution, teachingClasses, password, confirmPassword, agreeTerms } = teacherData;
    return name.trim() !== '' && 
           email.trim() !== '' && 
           institution.trim() !== '' && 
           teachingClasses.trim() !== '' && 
           password.trim() !== '' && 
           confirmPassword.trim() !== '' && 
           password === confirmPassword && 
           agreeTerms;
  };

  const googleStudentReady = () => {
    const { name, email, institution, studentClass, rollNo, agreeTerms } = studentData;
    return name.trim() !== '' && email.trim() !== '' && institution.trim() !== '' && studentClass.trim() !== '' && rollNo.trim() !== '' && agreeTerms;
  };

  const googleTeacherReady = () => {
    const { name, email, institution, teachingClasses, agreeTerms } = teacherData;
    return name.trim() !== '' && email.trim() !== '' && institution.trim() !== '' && teachingClasses.trim() !== '' && agreeTerms;
  };

  const saveGoogleProfile = async (uid: string) => {
    if (isTeacher) {
      await setDoc(doc(db, "users", uid), {
        uid,
        role: "teacher",
        name: teacherData.name.trim(),
        email: teacherData.email.trim(),
        institution: teacherData.institution.trim(),
        teachingClasses: teacherData.teachingClasses.trim(),
        ecoPoints: 0,
        level: 1,
        createdAt: serverTimestamp(),
      });
      return;
    }

    await setDoc(doc(db, "users", uid), {
      uid,
      role: "student",
      name: studentData.name.trim(),
      email: studentData.email.trim(),
      institution: studentData.institution.trim(),
      studentClass: studentData.studentClass.trim(),
      rollNo: studentData.rollNo.trim(),
      ecoPoints: 0,
      level: 1,
      createdAt: serverTimestamp(),
    });
  };

  const handleStudentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStudentForm()) {
      toast.error("Please fill in all required fields and ensure passwords match.");
      return;
    }

    setLoading(true);
    try {
      await signupStudent(studentData.email, studentData.password, {
        name: studentData.name,
        email: studentData.email,
        institution: studentData.institution,
        studentClass: studentData.studentClass,
        rollNo: studentData.rollNo
      });
      toast.success("Student account created successfully.");
      navigate("/dashboard", { replace: true });
    } catch (errorValue) {
      toast.error(mapError(errorValue));
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateTeacherForm()) {
      toast.error("Please fill in all required fields and ensure passwords match.");
      return;
    }

    setLoading(true);
    try {
      await signupTeacher(teacherData.email, teacherData.password, {
        name: teacherData.name,
        email: teacherData.email,
        institution: teacherData.institution,
        teachingClasses: teacherData.teachingClasses
      });
      toast.success("Teacher account created successfully.");
      navigate("/teacher-dashboard", { replace: true });
    } catch (errorValue) {
      toast.error(mapError(errorValue));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (userType: string) => {
    if (userType === "student" ? !googleStudentReady() : !googleTeacherReady()) {
      toast.error("Please complete the role details and accept the terms before continuing.");
      return;
    }

    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const existingProfile = await getCurrentUserProfile(credential.user.uid);

      if (existingProfile) {
        toast.success("Account already exists. Redirecting...");
        navigate(existingProfile.role === "student" ? "/dashboard" : "/teacher-dashboard", { replace: true });
        return;
      }

      await saveGoogleProfile(credential.user.uid);
      toast.success(`${userType === "student" ? "Student" : "Teacher"} account created successfully.`);
      navigate(userType === "student" ? "/dashboard" : "/teacher-dashboard", { replace: true });
    } catch (errorValue) {
      toast.error(mapError(errorValue));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col overflow-hidden relative"
      style={{ background: 'linear-gradient(140deg, #e8f5e8 0%, #f0f9f0 50%, #e1f0e1 100%)' }}
    >
      {/* Back button */}
      <div className="absolute top-3 left-3 z-20">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </Link>
      </div>

      {/* Main container */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-5xl h-[85vh] sm:h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Sliding container - contains both forms */}
          <div className={`flex w-[200%] h-full transition-transform duration-700 ease-in-out ${
            isTeacher ? '-translate-x-1/2' : 'translate-x-0'
          }`}>
            
            {/* Student Signup Section */}
            <div className="w-1/2 h-full flex">
              {/* Student Form */}
              <div className="w-3/4 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="max-w-sm mx-auto w-full">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">Student Signup</h2>
                  <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">Join EcoShala as a Student</p>
                  
                  {/* Google login option only */}
                  <div className="flex justify-center mb-4">
                    <button 
                      onClick={() => handleGoogleSignup('student')}
                      disabled={loading}
                      className="flex items-center justify-center gap-3 w-full max-w-xs bg-white border-2 border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      {loading ? "Signing Up..." : "Continue with Google"}
                    </button>
                  </div>

                  <div className="text-center mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm text-gray-500">or use your email for registration</span>
                  </div>

                  {/* Student form fields */}
                  <form className="space-y-2 sm:space-y-3" onSubmit={handleStudentSubmit}>
                    <input
                      type="text"
                      placeholder="Name *"
                      value={studentData.name}
                      onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />
                    
                    <input
                      type="email"
                      placeholder="Email *"
                      value={studentData.email}
                      onChange={(e) => setStudentData({...studentData, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />

                    <input
                      type="text"
                      placeholder="School/College *"
                      value={studentData.institution}
                      onChange={(e) => setStudentData({...studentData, institution: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <select
                        value={studentData.studentClass}
                        onChange={(e) => setStudentData({...studentData, studentClass: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                        required
                      >
                        <option value="">Select Class *</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                        <option value="9th">9th</option>
                        <option value="10th">10th</option>
                        <option value="11th">11th</option>
                        <option value="12th">12th</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Roll Number *"
                        value={studentData.rollNo}
                        onChange={(e) => setStudentData({...studentData, rollNo: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                        required
                      />
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password *"
                        value={studentData.password}
                        onChange={(e) => setStudentData({...studentData, password: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-8 sm:pr-10 text-xs sm:text-sm"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password *"
                        value={studentData.confirmPassword}
                        onChange={(e) => setStudentData({...studentData, confirmPassword: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-8 sm:pr-10 text-xs sm:text-sm"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </button>
                    </div>

                    {/* Password match validation message */}
                    {studentData.password && studentData.confirmPassword && studentData.password !== studentData.confirmPassword && (
                      <p className="text-red-500 text-xs">Passwords do not match</p>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="studentTerms"
                        checked={studentData.agreeTerms}
                        onChange={(e) => setStudentData({...studentData, agreeTerms: e.target.checked})}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        required
                      />
                      <label htmlFor="studentTerms" className="ml-2 text-xs sm:text-sm text-gray-600">
                        I agree to the Terms and Conditions *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !validateStudentForm()}
                      className={`w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                        validateStudentForm() && !loading
                          ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {loading ? "SIGNING UP..." : "SIGN UP"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Toggle Button for Teacher - Right Side */}
              <div className="w-1/4 bg-gradient-to-br from-green-500 to-green-700 flex flex-col justify-center items-center text-white cursor-pointer hover:from-green-600 hover:to-green-800 transition-all duration-300"
                onClick={toggleUserType}
              >
                <div className="text-center p-2 sm:p-4">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Are you a Teacher?</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-6 leading-relaxed px-1">
                    Connect with students and share your knowledge!
                  </p>
                  <button className="border-2 border-white text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 text-xs sm:text-sm">
                    SIGNUP AS TEACHER
                  </button>
                </div>
              </div>
            </div>

            {/* Teacher Signup Section */}
            <div className="w-1/2 h-full flex">
              {/* Toggle Button for Student - Left Side */}
              <div className="w-1/4 bg-gradient-to-br from-green-500 to-green-700 flex flex-col justify-center items-center text-white cursor-pointer hover:from-green-600 hover:to-green-800 transition-all duration-300"
                onClick={toggleUserType}
              >
                <div className="text-center p-2 sm:p-4">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Are you a Student?</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-6 leading-relaxed px-1">
                    Join your classmates and start learning today!
                  </p>
                  <button className="border-2 border-white text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 text-xs sm:text-sm">
                    SIGNUP AS STUDENT
                  </button>
                </div>
              </div>

              {/* Teacher Form */}
              <div className="w-3/4 p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-gray-50">
                <div className="max-w-sm mx-auto w-full">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-gray-800 text-center">Teacher Signup</h2>
                  <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">Join EcoShala as a Teacher</p>
                  
                  {/* Google login option only */}
                  <div className="flex justify-center mb-4">
                    <button 
                      onClick={() => handleGoogleSignup('teacher')}
                      disabled={loading}
                      className="flex items-center justify-center gap-3 w-full max-w-xs bg-white border-2 border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      {loading ? "Signing Up..." : "Continue with Google"}
                    </button>
                  </div>

                  <div className="text-center mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm text-gray-500">or use your email for registration</span>
                  </div>

                  {/* Teacher form fields */}
                  <form className="space-y-2 sm:space-y-3" onSubmit={handleTeacherSubmit}>
                    <input
                      type="text"
                      placeholder="Name *"
                      value={teacherData.name}
                      onChange={(e) => setTeacherData({...teacherData, name: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />
                    
                    <input
                      type="email"
                      placeholder="Email *"
                      value={teacherData.email}
                      onChange={(e) => setTeacherData({...teacherData, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />

                    <input
                      type="text"
                      placeholder="School/College *"
                      value={teacherData.institution}
                      onChange={(e) => setTeacherData({...teacherData, institution: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Classes Teaching (e.g., 9th, 10th, 11th) *"
                      value={teacherData.teachingClasses}
                      onChange={(e) => setTeacherData({...teacherData, teachingClasses: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-xs sm:text-sm"
                      required
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password *"
                        value={teacherData.password}
                        onChange={(e) => setTeacherData({...teacherData, password: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-8 sm:pr-10 text-xs sm:text-sm"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password *"
                        value={teacherData.confirmPassword}
                        onChange={(e) => setTeacherData({...teacherData, confirmPassword: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-8 sm:pr-10 text-xs sm:text-sm"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </button>
                    </div>

                    {/* Password match validation message */}
                    {teacherData.password && teacherData.confirmPassword && teacherData.password !== teacherData.confirmPassword && (
                      <p className="text-red-500 text-xs">Passwords do not match</p>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="teacherTerms"
                        checked={teacherData.agreeTerms}
                        onChange={(e) => setTeacherData({...teacherData, agreeTerms: e.target.checked})}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        required
                      />
                      <label htmlFor="teacherTerms" className="ml-2 text-xs sm:text-sm text-gray-600">
                        I agree to the Terms and Conditions *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !validateTeacherForm()}
                      className={`w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                        validateTeacherForm() && !loading
                          ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {loading ? "SIGNING UP..." : "SIGN UP"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign in link at bottom center */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-700 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-800 font-semibold transition-colors underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
