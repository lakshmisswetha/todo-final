import React, { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface ITodoProps {
    text: string;
    updateMode: () => void;
    deleteTodo: () => void;
}

const Todo: FC<ITodoProps> = ({ text, updateMode, deleteTodo }) => {
    return (
        <div className="todo relative  mt-5 bg-black w-[400px] h-[60px] rounded-lg flex justify-between items-center p-4">
            <div className="text text-white">{text}</div>
            <div className="flex">
                <EditIcon
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={updateMode}
                ></EditIcon>
                <DeleteIcon
                    style={{ color: "white", cursor: "pointer", marginLeft: "4px" }}
                    onClick={deleteTodo}
                ></DeleteIcon>
            </div>
        </div>
    );
};

export default Todo;
