import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export interface PointHistoryEntry {
  id: string;
  uid: string;
  points: number;
  reason: string;
  timestamp: Timestamp | null;
}

interface UsePointHistoryResult {
  history: PointHistoryEntry[];
  loading: boolean;
  error: string | null;
}

export const usePointHistory = (): UsePointHistoryResult => {
  const { user } = useAuth();
  const [history, setHistory] = useState<PointHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const historyQuery = query(
      collection(db, "pointHistory"),
      where("uid", "==", user.uid),
    );

    const unsubscribe = onSnapshot(
      historyQuery,
      (snapshot) => {
        const nextHistory = snapshot.docs
          .map((documentSnapshot) => ({
            id: documentSnapshot.id,
            uid: documentSnapshot.data().uid as string,
            points: documentSnapshot.data().points as number,
            reason: documentSnapshot.data().reason as string,
            timestamp: (documentSnapshot.data().timestamp as Timestamp | null) ?? null,
          }))
          .sort((left, right) => {
            const leftMillis = left.timestamp?.toMillis() ?? 0;
            const rightMillis = right.timestamp?.toMillis() ?? 0;
            return rightMillis - leftMillis;
          })
          .slice(0, 5);

        setHistory(nextHistory);
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  return { history, loading, error };
};
