import { UserModel } from './user-model';
import { Document, model, Schema } from "mongoose";

export interface ICartModel extends Document {
    date: String;
    userId: Schema.Types.ObjectId;
    isOpen: boolean;
}

const CartSchema = new Schema<ICartModel>({
    date: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    isOpen:{
        type: Boolean,
        required: true
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields:
CartSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

export const CartModel = model<ICartModel>("CartModel", CartSchema, "carts");
