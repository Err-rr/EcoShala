export type UserRole = "student" | "teacher";

export interface BaseUserProfile {
  uid: string;
  role: UserRole;
  name: string;
  email: string;
  institution: string;
  ecoPoints: number;
  level: number;
}

export interface StudentUser extends BaseUserProfile {
  role: "student";
  studentClass: string;
  rollNo: string;
}

export interface TeacherUser extends BaseUserProfile {
  role: "teacher";
  teachingClasses: string;
}

export type UserProfile = StudentUser | TeacherUser;

