import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { normalizeUserProfile } from "@/lib/userService";
import { useAuth } from "@/context/AuthContext";
import type { UserProfile } from "@/types/user";

interface UseUserProfileResult {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const useUserProfile = (): UseUserProfileResult => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setProfile(null);
          setError("Your EcoShala profile could not be found.");
          setLoading(false);
          return;
        }

        const normalizedProfile = normalizeUserProfile(snapshot.data() as Record<string, unknown>);

        if (!normalizedProfile) {
          setProfile(null);
          setError("Your EcoShala profile is incomplete.");
          setLoading(false);
          return;
        }

        setProfile(normalizedProfile);
        setError(null);
        setLoading(false);
      },
      (snapshotError) => {
        setProfile(null);
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  return { profile, loading, error };
};

