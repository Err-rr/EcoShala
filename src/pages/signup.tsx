import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  School,
  BookOpen,
  GraduationCap,
  Users,
} from 'lucide-react';

export default function Signup() {
  const [userType, setUserType] = useState('student');
  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Form inputs
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [teachingClasses, setTeachingClasses] = useState('');

  const formRef = useRef(null);
  const [formMinHeight, setFormMinHeight] = useState(0);

  useEffect(() => {
    if (formRef.current) {
      setFormMinHeight(formRef.current.getBoundingClientRect().height);
    }
  }, [userType, loginMethod]);

  const validateForm = () => {
    const commonValid =
      email && name && password && confirmPassword && institution && password === confirmPassword;
    if (userType === 'student') {
      return commonValid && studentClass && rollNo;
    } else {
      return commonValid && teachingClasses;
    }
  };

  const handleEmailSignup = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields and ensure passwords match.');
      return;
    }
    const userData = {
      userType,
      email,
      name,
      institution,
      password,
      ...(userType === 'student' ? { class: studentClass, rollNo } : { teachingClasses }),
    };
    console.log('Email signup:', userData);
  };

  const handleGoogleSignup = () => console.log('Google signup attempted for:', userType);

  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-hidden relative"
      style={{ background: 'linear-gradient(140deg, #b0f4cf 0%, #e0f7ef 50%, #a6e3ec 100%)' }}
    >
      <div className="flex-1 flex flex-col relative z-10 max-h-screen p-4 sm:p-6">
        <div className="flex-shrink-0">
          <Link to="/">
                <button
                className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors w-fit"
                style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Back to Home
            </button>
          </Link>
        </div>
        <main className="flex-grow flex flex-col justify-center max-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-lg mx-auto flex flex-col h-full">
            <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-4" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Create your account
              </h1>
              <p className="text-gray-800 text-base sm:text-lg" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Join EcoShala as a {userType}
              </p>
            </div>
            <div
              ref={formRef}
              style={{ minHeight: formMinHeight }}
              className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-6 flex flex-col overflow-auto transition-min-height duration-300 ease-in-out"
            >
              <div className="flex mb-5 bg-gray-100/60 rounded-2xl p-1 flex-shrink-0">
                <button
                  onClick={() => setUserType('student')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 ${
                    userType === 'student' ? 'bg-green-600 text-white shadow-lg scale-105' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                >
                  <GraduationCap className="w-4 h-4" />
                  Student
                </button>
                <button
                  onClick={() => setUserType('teacher')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 ${
                    userType === 'teacher' ? 'bg-green-600 text-white shadow-lg scale-105' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                >
                  <Users className="w-4 h-4" />
                  Teacher
                </button>
              </div>
              <div className="flex mb-5 bg-gray-100/60 rounded-2xl p-1 flex-shrink-0">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    loginMethod === 'email' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                >
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod('google')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    loginMethod === 'google' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                >
                  Google
                </button>
              </div>
              {loginMethod === 'email' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 overflow-auto max-h-[60vh] pr-2">
                  <div>
                    <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      School/College *
                    </label>
                    <div className="relative">
                      <School className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="Enter your school/college name"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  {userType === 'student' ? (
                    <>
                      <div>
                        <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                          Class *
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <select
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                            required
                          >
                            <option value="">Select your class</option>
                            <option value="6th">6th Grade</option>
                            <option value="7th">7th Grade</option>
                            <option value="8th">8th Grade</option>
                            <option value="9th">9th Grade</option>
                            <option value="10th">10th Grade</option>
                            <option value="11th">11th Grade</option>
                            <option value="12th">12th Grade</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="postgraduate">Postgraduate</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                          Roll Number *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <input
                            type="text"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="Enter your roll number"
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                        Classes Teaching *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                          type="text"
                          value={teachingClasses}
                          onChange={(e) => setTeachingClasses(e.target.value)}
                          placeholder="e.g., 9th, 10th, 11th"
                          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white/80 transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-black font-medium mb-2 text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-50/70 border-0 rounded-2xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
                          password !== confirmPassword && confirmPassword ? 'focus:ring-red-500' : 'focus:ring-green-600'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    {password !== confirmPassword && confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-grow">
                  <button
                    onClick={handleGoogleSignup}
                    className="w-full max-w-sm bg-white/90 border-2 border-gray-300 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-semibold shadow-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 hover:scale-105 active:scale-95 text-sm sm:text-base"
                    style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google as {userType === 'student' ? 'Student' : 'Teacher'}
                  </button>
                </div>
              )}

              <div className="flex items-center mt-4 flex-shrink-0">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="remember" className="ml-2 sm:ml-3 text-black text-sm sm:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                  I agree to the Terms & Conditions
                </label>
              </div>

              {loginMethod === 'email' && (
                <button
                  onClick={handleEmailSignup}
                  className={`w-full mt-4 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-semibold focus:outline-none focus:ring-4 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base ${
                    validateForm() ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-300' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}
                  disabled={!validateForm()}
                >
                  Sign Up as {userType === 'student' ? 'Student' : 'Teacher'}
                </button>
              )}
            </div>

            <div className="text-center mt-3 sm:mt-4 lg:mt-6 flex-shrink-0">
              <p className="text-gray-700 text-xs sm:text-sm lg:text-base" style={{ fontFamily: 'sans-serif', fontStyle: 'italic' }}>
                Already have an account?{' '}
                <a href="/login" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
