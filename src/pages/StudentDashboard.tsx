import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, LogOut, Trophy, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const StudentDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { profile, loading, error } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-700">
        Loading student profile...
      </div>
    );
  }

  if (error || !profile || profile.role !== "student") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="max-w-md text-center bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Student profile unavailable</h1>
          <p className="text-gray-600 mb-6">{error ?? "We could not load this student account."}</p>
          <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="flex items-center gap-2 text-green-700">
            <GraduationCap className="h-5 w-5" />
            <span className="font-semibold">Student Dashboard</span>
          </div>
          <button onClick={async () => { await logout(); navigate("/"); }} className="inline-flex items-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-xl shadow-green-100/50">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-green-600">Welcome back</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="mt-2 text-gray-600">Your EcoShala progress is synced directly from Firestore.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-gray-600">Eco Points</p>
                <p className="mt-2 text-2xl font-bold text-green-700">{profile.ecoPoints}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm text-gray-600">Level</p>
                <p className="mt-2 text-2xl font-bold text-emerald-700">Level {profile.level}</p>
              </div>
              <div className="rounded-2xl bg-lime-50 p-4">
                <p className="text-sm text-gray-600">Role</p>
                <p className="mt-2 text-2xl font-bold text-lime-700">Student</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2 text-gray-900">
              <User className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Profile</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">{profile.name}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{profile.email}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-gray-500">School</span>
                <span className="font-medium text-gray-900">{profile.institution}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2 text-gray-900">
              <Trophy className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Academic Details</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Class</span>
                <span className="font-medium text-gray-900">{profile.studentClass}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Roll No</span>
                <span className="font-medium text-gray-900">{profile.rollNo}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Level</span>
                <span className="font-medium text-gray-900">Level {profile.level}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
