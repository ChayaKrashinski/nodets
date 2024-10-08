// Order.service.ts

import { Order, OrderDocument } from '../db/schemas/order.schema';
import mongoose, { Types } from 'mongoose';

class OrderService {
    public async getOrderById(OrderId: string): Promise<Order | any> {
        try {
            const objectId = new Types.ObjectId(OrderId); // Convert the string to ObjectId
            const order = await Order.findById(objectId);
            if (!Order) {
                throw new Error(`Order not found with ID ${OrderId}`);
            }
            return order;
        } catch (error) {
            throw error;
        }
    }

    public async getOrders(): Promise<Order[]> {
        try {
            const Orders = await Order.find();
            if (!Orders) {
                throw new Error(`Orders not found`);
            }
            return Orders;
        } catch (error) {
            throw error;
        }
    }

    public async createOrder(order: Order): Promise<Order> {
        try {
            const newOrder = await Order.create(order);
            if (!order) {
                throw new Error(`Order faild to created`);
            }
            return newOrder;
        } catch (error) {
            throw error;
        }
    }

    public async updateOrder(orderId: string, order: Order): Promise<Order|any> {
        try {
            const newOrder = await Order.findByIdAndUpdate(orderId, order, { new: true });
            return newOrder;
         } catch (error) {
             throw error
         }
    }

    public async deleteOrder(OrderId: string): Promise<Order|any> {
        try {
           const order:Order|any = await Order.findOneAndDelete({ _id: OrderId });
           return order;
        } catch (error) {
            throw error
        }
    }
}

export default OrderService;
