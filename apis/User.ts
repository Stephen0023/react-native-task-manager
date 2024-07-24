// import {
//   autoSignIn,
//   confirmSignUp,
//   signIn,
//   signOut,
//   signUp,
// } from "aws-amplify/auth";

// export type UserStatusResult = {
//   status: UserStatus;
//   errorMessage?: string;
// };

// export enum UserStatus {
//   NOT_FOUND = "NOT_FOUND",
//   VERIFIED = "VERIFIED",
//   NEED_TO_VERIFY = "NEED_TO_VERIFY",
//   ERROR = "ERROR",
// }

// export async function checkUserStatusByEmail(
//   email: string
// ): Promise<UserStatusResult> {
//   try {
//     await confirmSignUp({
//       username: email,
//       confirmationCode: "000000",
//       options: {
//         forceAliasCreation: false,
//       },
//     });
//     return { status: UserStatus.NOT_FOUND };
//   } catch (err: any) {
//     switch (err.name) {
//       case "UserNotFoundException":
//         return { status: UserStatus.NOT_FOUND };
//       case "NotAuthorizedException":
//         return { status: UserStatus.VERIFIED };
//       case "AliasExistsException":
//         // Email alias already exists
//         return { status: UserStatus.VERIFIED };
//       case "CodeMismatchException":
//         return { status: UserStatus.NEED_TO_VERIFY };
//       case "ExpiredCodeException":
//         return { status: UserStatus.NEED_TO_VERIFY };
//       default:
//         return { status: UserStatus.ERROR, errorMessage: String(err) };
//     }
//   }
// }

// export async function handleSignIn(email: string, password: string) {
//   try {
//     await signIn({
//       username: email,
//       password,
//     });
//   } catch (error) {
//     console.error("Error signing in:", error);
//     throw error;
//   }
// }

// export async function handleSignOut() {
//   try {
//     await signOut();
//   } catch (error) {
//     console.error("Error signing out:", error);
//     throw error;
//   }
// }

// export async function handleSignUp(email: string, password: string) {
//   try {
//     const { isSignUpComplete, userId, nextStep } = await signUp({
//       username: email,
//       password,
//       options: {
//         userAttributes: {},
//         // optional
//         autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
//       },
//     });
//   } catch (error) {
//     console.log("error signing up:", error);
//     throw error;
//   }
// }

// export async function handleConfirmSignUp(
//   email: string,
//   confirmationCode: string
// ) {
//   try {
//     const { isSignUpComplete, nextStep } = await confirmSignUp({
//       username: email,
//       confirmationCode,
//     });

//     console.log(nextStep);

//     const signInOutput = await autoSignIn();
//     console.log(signInOutput);
//   } catch (error) {
//     console.log("error confirming sign up", error);
//     throw error;
//   }
// }

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { User } from "@/models";

import app from "@/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

export async function handleSignUp(
  email: string,
  password: string
): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up:", user);
    // Additional logic if needed
  } catch (error: any) {
    console.error("Error signing up:", error.code, error.message);
    throw error;
  }
}

export async function handleSignIn(
  email: string,
  password: string
): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
  } catch (error: any) {
    console.error("Error signing in:", error.code, error.message);
    throw error;
  }
}

export async function handleSignOut(): Promise<void> {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error: any) {
    console.error("Error signing out:", error.code, error.message);
  }
}

export async function addUser(uid: string, email: string) {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, {
      id: uid,
      email,
      createdAt: new Date(),
    });
    console.log(`User added with UID: ${uid}`);
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}

export async function getUserByAuthId(uid: string): Promise<User | null> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    if (userDoc.exists() && data) {
      return {
        id: userDoc.id,
        email: data.email,
        createdAt: data.createdAt.toDate(),
      };
    } else {
      // User not found
      console.log(`No user found with UID: ${uid}`);
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching user:", error);
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const users: User[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        createdAt: data.createdAt.toDate(),
      };
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
