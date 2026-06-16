import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface StudentSignupData {
  name: string;
  email: string;
  institution: string;
  studentClass: string;
  rollNo: string;
}

export interface TeacherSignupData {
  name: string;
  email: string;
  institution: string;
  teachingClasses: string;
}

export const signupStudent = async (email: string, password: string, data: StudentSignupData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    role: "student",
    name: data.name,
    email: data.email,
    institution: data.institution,
    studentClass: data.studentClass,
    rollNo: data.rollNo,
    ecoPoints: 0,
    level: 1,
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

export const signupTeacher = async (email: string, password: string, data: TeacherSignupData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    role: "teacher",
    name: data.name,
    email: data.email,
    institution: data.institution,
    teachingClasses: data.teachingClasses,
    ecoPoints: 0,
    level: 1,
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
