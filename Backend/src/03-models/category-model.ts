import { Document, model, Schema } from "mongoose";

export interface ICategoryModel extends Document {
    name: string;
}

const CategorySchema = new Schema<ICategoryModel>({
    name: {
        "type": String,
        "required": true
    }
}, {
    versionKey: false
});

export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");
