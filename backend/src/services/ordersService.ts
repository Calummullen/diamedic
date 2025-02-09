import { db } from "../helpers/firestore";
import { Order, orderSchema } from "../types/orders-schema";
import { ProfileData } from "../types/profile-schema";

export const createOrder = async (data: Order) => {
  const parsedOrder = orderSchema.safeParse(data);

  if (!parsedOrder.success) {
    console.error("Order data validation failed:", parsedOrder.error.format());
  } else {
    await db.collection("orders").doc().set(parsedOrder.data);
    console.log(`✅ Order for user ${data.userId} stored successfully.`);
  }
};
