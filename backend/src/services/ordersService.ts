import { db } from "../helpers/firestore";
import { Order, orderSchema } from "../types/orders-schema";
import * as Sentry from "@sentry/node";

export const createOrder = async (data: Order) => {
  const parsedOrder = orderSchema.safeParse(data);

  if (!parsedOrder.success) {
    Sentry.captureException(
      `Order Service: Failed to parse order schema ${parsedOrder}`
    );
  } else {
    await db
      .collection("orders")
      .doc(parsedOrder.data.userId)
      .set(parsedOrder.data);
    console.log(`✅ Order for user ${data.userId} stored successfully.`);
  }
};

export const getOrders = async () => {
  const snapshot = await db.collection("orders").get();
  const orders: Order[] = [];
  snapshot.forEach((doc) => {
    orders.push({
      userId: doc.id,
      ...doc.data(),
    } as Order);
  });
  return orders;
};

export const updateOrder = async (
  userId: string,
  status: string
): Promise<Order> => {
  try {
    const orderRef = db.collection("orders").doc(userId);

    const doc = await orderRef.get();
    if (!doc.exists) {
      Sentry.captureException(`Order with ID ${userId} not found.`);
      throw new Error("Order not found");
    }

    await orderRef.update({ status });

    // ✅ Fetch the updated order
    const updatedDoc = await orderRef.get();
    const updatedOrder = {
      userId: updatedDoc.id,
      ...updatedDoc.data(),
    } as Order;

    console.log(`Order ${userId} updated successfully.`);
    return updatedOrder;
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setContext("Order Service: Failed to send order", {
        userId,
        status,
      });
      Sentry.captureException(error);
    });
    throw new Error("Failed to update order status");
  }
};
