import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { Task } from "@/models";

import app from "@/firebaseConfig";

const db = getFirestore(app);

export async function getCompletedTasks(
  userId: string,
  timeFrame: "daily" | "weekly" | "monthly"
): Promise<number> {
  let start: Timestamp, end: Timestamp;

  const now = new Date();

  switch (timeFrame) {
    case "daily":
      start = Timestamp.fromDate(new Date(now.setHours(0, 0, 0, 0)));
      end = Timestamp.fromDate(new Date(now.setHours(23, 59, 59, 999)));
      break;
    case "weekly":
      const firstDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay())
      );
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      lastDayOfWeek.setHours(23, 59, 59, 999);
      start = Timestamp.fromDate(new Date(firstDayOfWeek.setHours(0, 0, 0, 0)));
      end = Timestamp.fromDate(lastDayOfWeek);
      break;
    case "monthly":
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      start = Timestamp.fromDate(
        new Date(firstDayOfMonth.setHours(0, 0, 0, 0))
      );
      end = Timestamp.fromDate(
        new Date(lastDayOfMonth.setHours(23, 59, 59, 999))
      );
      break;
    default:
      throw new Error("Invalid time frame specified");
  }
  console.log(start);
  console.log(end);

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("completed", "==", true),
    where("completedAt", ">=", start),
    where("completedAt", "<=", end)
  );

  const querySnapshot = await getDocs(q);
  const numberOfCompletedTasks = querySnapshot.docs.length;
  console.log(
    `${
      timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)
    } Completed Tasks:`,
    querySnapshot.docs.map((doc) => doc.data())
  );
  return numberOfCompletedTasks;
}

export async function getAllTasksByUserId(userId: string): Promise<Task[]> {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No tasks found for this user.");
    return [];
  }

  const tasks: Task[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: data.createdAt.toDate(),
      completedAt: data.completedAt ? data.completedAt.toDate() : undefined,
    };
  });

  return tasks;
}

export async function createTask(
  task: Omit<Task, "createdAt" | "completedAt">
): Promise<string> {
  try {
    const taskId = task.id; // Assuming 'task' has an 'id' field
    await setDoc(doc(db, "tasks", taskId), {
      ...task,
      createdAt: Timestamp.now(),
    });
    return taskId;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
}

export async function updateTask(
  taskId: string,
  updates: Partial<Omit<Task, "createdAt" | "userId">>
) {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updates);
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
}

export async function deleteTask(taskId: string) {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
}
