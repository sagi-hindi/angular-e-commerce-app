import { CartModel } from './cart-model';
import { Document, model, Schema } from "mongoose";

export interface IOrderModel extends Document {
    cartId: Schema.Types.ObjectId;
    totalPrice: number;
    cityToDelivery: string;
    streetToDelivery: string;
    deliveryDate: string;
    orderDate:string;
    fourDigitCode:number;
}

const OrderSchema = new Schema<IOrderModel>({
    cartId: {
        type: Schema.Types.ObjectId,
        required: true,

    },
    totalPrice: {
        type: Number,
        required: true,
        integer: true

    },
    cityToDelivery: {
        type: String,
        required: true,
        integer: true
    
    },
    streetToDelivery: {
        type: String,
        required: true,
        integer: true
    
    },
    deliveryDate: {
        type: String,
        required: true,
        integer: true
    
    },
    orderDate: {
        type: String,
        required: true,
        integer: true
    
    },
    fourDigitCode: {
        type: Number,
        required: true,
        integer: true    
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

OrderSchema.virtual("cart", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

export const OrderModel = model<IOrderModel>("OrderModel", OrderSchema, "order");
