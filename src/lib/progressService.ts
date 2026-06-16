import { doc, runTransaction, serverTimestamp, type Transaction } from "firebase/firestore";
import { db } from "./firebase";
import { applyPointAward } from "./pointsService";

interface RewardResult {
  awarded: boolean;
  points: number;
  totalPoints: number | null;
}

const buildCompletionId = (uid: string, itemId: string): string => `${uid}_${itemId}`;

const awardUniqueProgressPoints = async (
  collectionName: "questCompletions" | "lectureCompletions",
  uid: string,
  itemId: string,
  points: number,
  reason: string,
): Promise<RewardResult> => {
  return runTransaction(db, async (transaction: Transaction) => {
    const completionRef = doc(db, collectionName, buildCompletionId(uid, itemId));
    const completionSnapshot = await transaction.get(completionRef);

    if (completionSnapshot.exists()) {
      return {
        awarded: false,
        points,
        totalPoints: null,
      };
    }

    transaction.set(completionRef, {
      uid,
      itemId,
      points,
      reason,
      completedAt: serverTimestamp(),
    });

    const totalPoints = await applyPointAward(transaction, uid, points, reason);

    return {
      awarded: true,
      points,
      totalPoints,
    };
  });
};

export const awardQuestPoints = async (
  uid: string,
  questId: string,
  points: number,
  reason = "Quest Completed",
): Promise<RewardResult> => {
  return awardUniqueProgressPoints("questCompletions", uid, questId, points, reason);
};

export const awardLecturePoints = async (
  uid: string,
  lectureId: string,
  points: number,
  reason = "Lecture Completed",
): Promise<RewardResult> => {
  return awardUniqueProgressPoints("lectureCompletions", uid, lectureId, points, reason);
};
