import { z } from "zod";
import mongooose from "mongoose";

export const paginationValidationSchema = z.object({
    pageIdx: z.coerce.number().positive().gt(0).default(2),
    limit: z.coerce.number().positive().gt(2).default(5),
});

export const userValidationSchema = z.object({
    username: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
});

export const validateSave = z.object({
    text: z.string().min(3),
});

export const validateDelete = z.object({
    todoId: z.string().refine((val) => mongooose.Types.ObjectId.isValid(val), "Invalid Id"),
});

export const validateUpdate = z.object({
    ...validateSave.shape,
    _id: z.string().refine((val) => mongooose.Types.ObjectId.isValid(val), "Invalid Id"),
});
