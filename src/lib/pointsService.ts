import {
  collection,
  doc,
  increment,
  runTransaction,
  serverTimestamp,
  type Transaction,
} from "firebase/firestore";
import { db } from "./firebase";

export const calculateLevel = (points: number): number => {
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

export const applyPointAward = async (
  transaction: Transaction,
  uid: string,
  points: number,
  reason: string,
): Promise<number> => {
  const userRef = doc(db, "users", uid);
  const snapshot = await transaction.get(userRef);

  if (!snapshot.exists()) {
    throw new Error("User not found.");
  }

  const data = snapshot.data() as Record<string, unknown>;
  const currentPoints = typeof data.ecoPoints === "number" && Number.isFinite(data.ecoPoints) ? data.ecoPoints : 0;
  const nextPoints = currentPoints + points;

  transaction.update(userRef, {
    ecoPoints: increment(points),
    level: calculateLevel(nextPoints),
  });

  const activityRef = doc(collection(db, "activities"));
  transaction.set(activityRef, {
    uid,
    type: reason,
    points,
    reason,
    timestamp: serverTimestamp(),
  });

  const pointHistoryRef = doc(collection(db, "pointHistory"));
  transaction.set(pointHistoryRef, {
    uid,
    points,
    reason,
    timestamp: serverTimestamp(),
  });

  return nextPoints;
};

export const awardPoints = async (
  uid: string,
  points: number,
  reason: string,
): Promise<number> => {
  if (!Number.isFinite(points)) {
    throw new Error("Points must be a finite number.");
  }

  return runTransaction(db, async (transaction) => {
    return applyPointAward(transaction, uid, points, reason);
  });
};
