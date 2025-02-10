import { Request, Response } from "express";
import { ProfileData, profileSchema } from "../types/profile-schema";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/userService";
import { sendSms } from "../services/smsService";
import { getAddressFromCoordinates } from "../services/locationService";
import uuid4 from "uuid4";
import { Order } from "../types/orders-schema";
import { getOrders, updateOrder } from "../services/ordersService";

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await getOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId, status } = req.body;

    if (!documentId || !status) {
      return res
        .status(400)
        .json({ error: "documentId and status are required." });
    }

    const updatedOrder = await updateOrder(documentId, status);

    res.json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};
