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
  if (!doc.exists) {
    Sentry.captureException(`User with ID ${userId} not found.`);
    throw new Error("Profile not found");
  }

  return doc.data() as ProfileData;
};

export const updateUserProfile = async (userId: string, data: ProfileData) => {
  await db.collection("users").doc(userId).update({ data });
};
