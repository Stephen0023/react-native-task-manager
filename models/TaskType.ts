import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  userId: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Timestamp;
}
