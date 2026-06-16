import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

interface StudentRouteProps {
  children: ReactNode;
}

const StudentRoute = ({ children }: StudentRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-700">
        Loading your student dashboard...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile.role !== "student") {
    return <Navigate to="/teacher-dashboard" replace />;
  }

  return <>{children}</>;
};

export default StudentRoute;

