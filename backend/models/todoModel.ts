import mongoose, { Schema, Document } from "mongoose";

interface Itodo extends Document {
    text: string;
    userId: string;
}

const todoSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const todoModel = mongoose.model<Itodo>("todo", todoSchema);

export default todoModel;
