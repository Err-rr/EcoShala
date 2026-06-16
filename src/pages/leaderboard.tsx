import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Crown, GraduationCap, Loader2, LogOut, Medal, Star, Trophy, Users } from "lucide-react";
import { onSnapshot } from "firebase/firestore";
import { getTopUsers } from "@/lib/firestoreService";
import { useAuth } from "@/context/AuthContext";
import { normalizeUserProfile } from "@/lib/userService";
import type { UserProfile } from "@/types/user";

interface LeaderboardRow {
  rank: number;
  profile: UserProfile;
}

const Leaderboard = () => {
  const { logout } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      getTopUsers(),
      (snapshot) => {
        const nextProfiles = snapshot.docs
          .map((documentSnapshot) =>
            normalizeUserProfile({
              uid: documentSnapshot.id,
              ...(documentSnapshot.data() as Record<string, unknown>),
            }),
          )
          .filter((profile): profile is UserProfile => profile !== null);

        setProfiles(nextProfiles);
        setError(null);
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const rows = useMemo<LeaderboardRow[]>(() => {
    return profiles.map((profile, index) => ({
      rank: index + 1,
      profile,
    }));
  }, [profiles]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Crown className="h-5 w-5 text-yellow-500" />;
    }

    if (rank === 2) {
      return <Medal className="h-5 w-5 text-gray-400" />;
    }

    if (rank === 3) {
      return <Trophy className="h-5 w-5 text-amber-600" />;
    }

    return <span className="text-sm font-semibold text-gray-600">#{rank}</span>;
  };

  const getRoleLabel = (profile: UserProfile) => (profile.role === "student" ? "Student" : "Teacher");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="border-b border-green-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <div className="flex items-center gap-2 text-green-700">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">EcoShala Leaderboard</span>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Entries</p>
                <p className="mt-1 text-2xl font-bold text-green-700">{profiles.length}</p>
              </div>
              <Users className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Rank</p>
                <p className="mt-1 text-2xl font-bold text-green-700">{profiles[0]?.name ?? "—"}</p>
              </div>
              <GraduationCap className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Max Points</p>
                <p className="mt-1 text-2xl font-bold text-green-700">{profiles[0]?.ecoPoints ?? 0}</p>
              </div>
              <Star className="h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white shadow-xl">
          <div className="border-b border-green-100 px-6 py-5">
            <h1 className="text-2xl font-bold text-gray-900">Top EcoShala users</h1>
            <p className="mt-1 text-sm text-gray-500">Updated in real time with the top 50 users by eco points.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 px-6 py-20 text-green-700">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading leaderboard...
            </div>
          ) : error ? (
            <div className="px-6 py-20 text-center text-red-600">{error}</div>
          ) : rows.length === 0 ? (
            <div className="px-6 py-20 text-center text-gray-500">No leaderboard data available yet.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {rows.map(({ rank, profile }) => (
                <div
                  key={profile.uid}
                  className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                      {getRankIcon(rank)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{profile.name}</p>
                      <p className="text-sm text-gray-500">
                        {getRoleLabel(profile)} • {profile.institution}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                    <div>
                      <p className="text-gray-500">Role</p>
                      <p className="font-medium text-gray-900">{getRoleLabel(profile)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Eco Points</p>
                      <p className="font-medium text-green-700">{profile.ecoPoints}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Level</p>
                      <p className="font-medium text-gray-900">Level {profile.level}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
