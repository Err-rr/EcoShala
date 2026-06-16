import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { TeacherUser, UserProfile, UserRole } from "@/types/user";

const deriveLevel = (points: number): number => {
  if (points >= 1000) {
    return 5;
  }

  if (points >= 500) {
    return 4;
  }

  if (points >= 250) {
    return 3;
  }

  if (points >= 100) {
    return 2;
  }

  return 1;
};

const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const isRole = (value: unknown): value is UserRole => value === "student" || value === "teacher";

const normalizeBaseProfile = (data: Record<string, unknown>) => {
  if (!isString(data.uid) || !isRole(data.role) || !isString(data.name) || !isString(data.email) || !isString(data.institution)) {
    return null;
  }

  const ecoPoints = isNumber(data.ecoPoints) ? data.ecoPoints : 0;
  const level = isNumber(data.level) ? data.level : deriveLevel(ecoPoints);

  return {
    uid: data.uid,
    role: data.role,
    name: data.name,
    email: data.email,
    institution: data.institution,
    ecoPoints,
    level,
  } as const;
};

export const normalizeUserProfile = (data: Record<string, unknown>): UserProfile | null => {
  const baseProfile = normalizeBaseProfile(data);

  if (!baseProfile) {
    return null;
  }

  if (baseProfile.role === "student") {
    if (!isString(data.studentClass) || !isString(data.rollNo)) {
      return null;
    }

    return {
      ...baseProfile,
      role: "student",
      studentClass: data.studentClass,
      rollNo: data.rollNo,
    };
  }

  if (!isString(data.teachingClasses)) {
    return null;
  }

  const teacherProfile: TeacherUser = {
    ...baseProfile,
    role: "teacher",
    teachingClasses: data.teachingClasses,
  };

  return teacherProfile;
};

export const getCurrentUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeUserProfile(snapshot.data() as Record<string, unknown>);
};

export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  const profile = await getCurrentUserProfile(uid);
  return profile?.role ?? null;
};

