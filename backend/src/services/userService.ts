import { db } from "../helpers/firestore";
import { ProfileData } from "../types/profile-schema";
import * as Sentry from "@sentry/node";

export const createUserProfile = async (data: ProfileData, userId: string) => {
  await db
    .collection("users")
    .doc(userId)
    .set({ ...data, hasPaid: false });
};

export const getUserProfile = async (userId: string) => {
  const doc = await db.collection("users").doc(userId).get();
  return doc.exists ? (doc.data() as ProfileData) : null;
};

export const updateUserProfile = async (userId: string, data: ProfileData) => {
  await db.collection("users").doc(userId).update({ data });
};
