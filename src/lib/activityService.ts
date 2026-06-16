import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { ActivityType } from "@/types/activity";

export const recordActivity = async (
  uid: string,
  type: ActivityType,
  points: number,
  reason: string,
  metadata: Record<string, unknown> = {},
) => {
  const activityRef = doc(collection(db, "activities"));

  await setDoc(activityRef, {
    uid,
    type,
    points,
    reason,
    timestamp: serverTimestamp(),
    ...metadata,
  });

  return activityRef.id;
};

