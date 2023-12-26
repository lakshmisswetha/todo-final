import mongoose, { Schema } from "mongoose";

export interface Iuser {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model<Iuser>("user", userSchema);

export default userModel;
