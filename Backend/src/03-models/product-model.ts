import { CategoryModel } from './category-model';
import { Document, model, Schema } from "mongoose";
import { UploadedFile } from 'express-fileupload';

export interface IProductModel extends Document {
    name: string;
    price: number;
    image:UploadedFile;
    imageName: string;
    categoryId: Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    image: {
        type: Object,
        required: false
    },
    imageName: {
        type: String,
        required: false
    },
    categoryId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields:
ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products");
