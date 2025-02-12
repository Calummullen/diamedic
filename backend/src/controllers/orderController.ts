import { Request, Response } from "express";
import { Order } from "../types/orders-schema";
import { getOrders, updateOrder } from "../services/ordersService";
import * as Sentry from "@sentry/node";

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await getOrders();
    res.json(orders);
  } catch (error) {
    Sentry.captureException(error);
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) {
      return res.status(400).json({ error: "userId and status are required." });
    }

    const updatedOrder = await updateOrder(userId, status);

    res.json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setContext("Order Status: Failed to update order", { ...req.body });
      Sentry.captureException(error);
    });
    res.status(500).json({ error: (error as Error).message });
  }
};
