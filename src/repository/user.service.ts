import { db } from "@/firebaseConfig";
import { ProfileResponse, UserProfile } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: UserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    let tempData: ProfileResponse = {};

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserProfile;
        tempData = {
          id: doc.id,
          ...userData,
        };
      });
      return tempData;
    } else {
      console.log("No such document");
      return tempData;
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
};

export const updateUserProfile = (id: string, user: UserProfile) => {
  return updateDoc(doc(db, COLLECTION_NAME, id), { ...user });
};
