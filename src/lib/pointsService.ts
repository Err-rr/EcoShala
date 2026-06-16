import { updateUserPoints } from "./firestoreService";

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

export const awardPoints = async (uid: string, points: number): Promise<number> => {
  return updateUserPoints(uid, points);
};

