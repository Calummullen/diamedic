import { db } from "../helpers/firestore";
import { ProfileData } from "../types/profile-schema";
import uuid4 from "uuid4";

export const createUserProfile = async (data: ProfileData, userId: string) => {
  await db
    .collection("users")
    .doc(userId)
    .set({ ...data, hasPaid: false });
};

export const getUserProfile = async (userId: string) => {
  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) {
    throw new Error("Profile not found");
  }

  return doc.data() as ProfileData;
};

export const updateUserProfile = async (userId: string, data: ProfileData) => {
  await db.collection("users").doc(userId).update({ data });
};
