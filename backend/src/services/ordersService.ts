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

export const getOrders = async () => {
  const snapshot = await db.collection("orders").get();
  const orders: Order[] = [];

  snapshot.forEach((doc) => {
    orders.push({
      documentId: doc.id,
      ...doc.data(),
    } as Order);
  });

  return orders;
};

export const updateOrder = async (
  documentId: string,
  status: string
): Promise<Order> => {
  try {
    const orderRef = db.collection("orders").doc(documentId);

    const doc = await orderRef.get();
    if (!doc.exists) {
      console.error(`Order with ID ${documentId} not found.`);
      throw new Error("Order not found");
    }

    await orderRef.update({ status });

    // ✅ Fetch the updated order
    const updatedDoc = await orderRef.get();
    const updatedOrder = {
      documentId: updatedDoc.id,
      ...updatedDoc.data(),
    } as Order;

    console.log(`Order ${documentId} updated successfully.`);
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};
