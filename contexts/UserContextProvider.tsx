import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

import BottomSheet from "@gorhom/bottom-sheet";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addUser, getUserByAuthId, getAllTasksByUserId } from "@/apis";
import { Task } from "@/models";
// import { User } from "../models/User";

export interface UserData {
  userId: string;
  email: string;
  tasks?: Task[];
}

interface UserContextType {
  user: UserData | null;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  authBottomSheetRef: React.RefObject<BottomSheet> | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const authBottomSheetRef = useRef<BottomSheet>(null);
  const auth = getAuth();

  function openBottomSheet() {
    if (authBottomSheetRef.current) {
      authBottomSheetRef.current?.expand();
    }
  }

  function closeBottomSheet() {
    if (authBottomSheetRef.current) {
      authBottomSheetRef.current?.close();
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;

        syncCurrentUser(uid, email as string);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  async function syncCurrentUser(userId: string, email: string) {
    try {
      const user = await getUserByAuthId(userId);

      let tasks: Task[] = [];

      if (user) {
        tasks = await getAllTasksByUserId(userId);
      } else {
        await addUser(userId, email);
      }

      setUser((prevUser) => ({
        ...prevUser,
        userId,
        email,
        tasks,
      }));

      //   }
    } catch (error) {
      console.log("error when sync current user", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        openBottomSheet,
        closeBottomSheet,
        authBottomSheetRef,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
