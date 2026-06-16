import {
  collection,
  doc,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  type Query,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import { normalizeUserProfile, getCurrentUserProfile } from "./userService";
import type { UserProfile } from "@/types/user";

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

export const getTopUsers = (): Query<DocumentData> => {
  return query(collection(db, "users"), orderBy("ecoPoints", "desc"), limit(50));
};

export const getUserByUid = async (uid: string): Promise<UserProfile | null> => {
  return getCurrentUserProfile(uid);
};

export const updateUserPoints = async (uid: string, points: number): Promise<number> => {
  if (!Number.isFinite(points)) {
    throw new Error("Points must be a finite number.");
  }

  const userRef = doc(db, "users", uid);

  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User not found.");
    }

    const data = snapshot.data() as Record<string, unknown>;
    const currentPoints = typeof data.ecoPoints === "number" && Number.isFinite(data.ecoPoints) ? data.ecoPoints : 0;
    const nextPoints = currentPoints + points;

    transaction.update(userRef, {
      ecoPoints: increment(points),
      level: deriveLevel(nextPoints),
    });

    return nextPoints;
  });
};

export const parseLeaderboardUser = (snapshot: QueryDocumentSnapshot<DocumentData>): UserProfile | null => {
  return normalizeUserProfile({ uid: snapshot.id, ...(snapshot.data() as Record<string, unknown>) });
};
