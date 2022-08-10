import { ProductModel } from './product-model';
import { Document, model, Schema } from "mongoose";

export interface ICartItemModel extends Document {
    totalPrice: number;
    quantity: number;
    productId: Schema.Types.ObjectId;
    cartId: Schema.Types.ObjectId;
}

const CartItemSchema = new Schema<ICartItemModel>({
    totalPrice: {
        type: Number,
        required: true,
        integer: true

    },
    quantity: {
        type: Number,
        required: true,
        integer: true
    
    },
    productId: {
        type: Schema.Types.ObjectId
    },
    cartId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields:
CartItemSchema.virtual("product", {
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

CartItemSchema.virtual("cart", {
    ref: ProductModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

export const CartItemModel = model<ICartItemModel>("CartItemModel", CartItemSchema, "cart-items");
