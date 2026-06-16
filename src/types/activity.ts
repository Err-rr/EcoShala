export type ActivityType =
  | "eco-activity"
  | "plant-health"
  | "upcycling"
  | "eco-explorer"
  | "quiz";

export interface ActivityRecord {
  uid: string;
  type: ActivityType;
  points: number;
  timestamp: unknown;
  reason: string;
}

