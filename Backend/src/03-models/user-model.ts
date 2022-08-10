import { Document, model, Schema } from "mongoose";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    street: string;
    role: string;
    idNumber: number;
}

const userSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    idNumber: {
        type: Number,
        required: true,
        integer: true,
        unique: true
    }
}, {
    versionKey: false
});

export const UserModel = model<IUserModel>("UserModel", userSchema, "users");
