import { Request, Response } from "express";
import todoModel from "../models/todoModel";
import { paginationValidationSchema } from "../utils/validationSchema";
import { validateSave, validateDelete, validateUpdate } from "../utils/validationSchema";
import { z } from "zod";

export const getTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { pageIdx = 1, limit = 5 } = paginationValidationSchema.parse(req.query);

        const todoItems = await todoModel
            .find({ userId }, { todoId: "$_id", _id: 0, text: 1 })
            .sort({ createdAt: -1 })
            .skip((pageIdx - 1) * limit)
            .limit(limit);

        const totalDocs = await todoModel.find({ userId }).countDocuments();
        return res.status(200).json({
            status: true,
            data: { todoItems, totalDocs },
            message: "Successfully Fetched",
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({ status: false });
    }
};

export const addTodo = async (req: Request, res: Response) => {
    try {
        const data = await todoModel.create({
            text: validateSave.parse(req.body).text,
            userId: req.user?.id,
            date: new Date(),
        });

        return res.status(201).json({ status: true, todo: data, message: "item added" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        console.log(error);
        return res.status(500).json({ status: false });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const { _id, text } = validateUpdate.parse(req.body);
        const todo = await todoModel.findOne({ _id, userId });
        if (todo) {
            const result = await todoModel.findByIdAndUpdate(todo.id, { text }, { new: true });
            return res.status(200).json({ status: true, message: "updated successfully" });
        } else {
            return res.status(401).json({ status: false, error: "unauthorized" });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        console.log(error);
        return res.status(500).json({ status: false });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { todoId } = validateDelete.parse(req.body);
        const userId = req.user?.id;
        const todo = await todoModel.findOne({ _id: todoId, userId });

        if (todo) {
            await todoModel.findByIdAndDelete(todo.id);
            return res.status(200).json({ status: true, message: "deleted successfully" });
        } else {
            return res.status(401).json({ status: false, error: "unauthorized" });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data",
                error: error.errors,
            });
        }
        console.log(error);
        res.status(500).json({ status: false });
    }
};
