import { db } from "../helpers/firestore";
import { encryptData, decryptData } from "../helpers/encryption";
import { ProfileData } from "../types/profile-schema";
import QRCode from "qrcode";
import uuid4 from "uuid4";

export const createUserProfile = async (data: ProfileData) => {
  const encryptedData = encryptData(data);
  const userId = uuid4();
  await db.collection("users").doc(userId).set({ encryptedData });

  const qrCodeUrl = `${process.env.FRONTEND_BASE_URL}/${userId}`;
  // const qrCode = await QRCode.toDataURL(qrCodeUrl);

  return { userId, qrCode: qrCodeUrl };
};

export const getUserProfile = async (userId: string) => {
  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) {
    throw new Error("Profile not found");
  }

  const encryptedData = doc.data()?.encryptedData;
  return decryptData(encryptedData);
};

export const updateUserProfile = async (userId: string, data: ProfileData) => {
  const encryptedData = encryptData(data);
  await db.collection("users").doc(userId).update({ encryptedData });
};
