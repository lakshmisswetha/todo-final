import { Button, TextField, TablePagination, ThemeProvider } from "@mui/material";
import axios from "axios";
import React from "react";
import Todo from "../components/Todo";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    addTodoRedux,
    deleteTodoRedux,
    loadTodos,
    updateTodoRedux,
} from "../redux/actions/todoActions";

interface ITodoModel {
    todoId: string;
    text: string;
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
    },
});

const basicSchema = z.object({
    text: z.string().max(5, "maximum 5 allowed"),
});

const Home = () => {
    const todo = useSelector((state: any) => state.todos);
    console.log(todo);
    const [isUpdating, setIsUpdating] = useState(false);
    const [todoId, setTodoId] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalDocs, setTotalDocs] = useState(5);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");

        navigate("/");
    };

    const updateMode = (_id: string, text: string) => {
        setIsUpdating(true);
        setTodoId(_id);
        values.text = text;
    };
    const onSubmit = () => {
        if (isUpdating) {
            updateTodo(todoId, values.text, setIsUpdating);
            values.text = "";
        } else {
            addTodo(values.text);
            values.text = "";
        }
    };

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            text: "",
        },
        validate: toFormikValidate(basicSchema),
        onSubmit,
    });

    const fetchTodo = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/todo`, {
                params: {
                    pageIdx: page,
                    limit: limit,
                },
                headers: {
                    Authorization: "bearer " + localStorage.getItem("token") || "",
                },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
            }

            const data = response.data;

            if (data.status) {
                dispatch(loadTodos(data.data.todoItems));
                setTotalDocs(data.data.totalDocs);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const addTodo = async (text: string) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/todo`,
                { text },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "bearer " + localStorage.getItem("token") || "",
                    },
                }
            );
            if (response.status === 401) {
                localStorage.removeItem("token");
            }
            const data = response.data;
            if (data.status) {
                text = "";
                await fetchTodo();
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updateTodo = async (
        todoId: string,
        text: string,
        setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/todo`,
                { _id: todoId, text },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "bearer " + localStorage.getItem("token") || "",
                    },
                }
            );
            if (response.status === 401) {
                localStorage.removeItem("token");
            }
            const data = response.data;
            if (data.status) {
                dispatch(updateTodoRedux(todoId, text));
                setIsUpdating(false);
                values.text = "";
                await fetchTodo();
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTodo = async (todoId: string) => {
        try {
            const response = await axios.delete(`${BASE_URL}/todo`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + localStorage.getItem("token") || "",
                },
                data: { todoId },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
            }
            const data = response.data;
            dispatch(deleteTodoRedux(todoId));
            if (data.status) {
                fetchTodo();
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTodo();
    }, [page, limit]);

    return (
        <div className="h-screen p-4">
            <h1 className="text-center text-3xl font-bold mt-4 ">Todo App</h1>

            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit} className="flex justify-center mt-6">
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={values.text}
                        name="text"
                        onChange={handleChange}
                        error={Boolean(errors.text)}
                        helperText={errors.text ? "Too Long" : ""}
                    />
                    <Button type="submit" sx={{ width: "90px", ml: "10px" }} variant="contained">
                        {isUpdating ? "Update" : "Add"}
                    </Button>
                    <Button
                        onClick={handleLogout}
                        sx={{ width: "90px", ml: "10px" }}
                        variant="contained"
                    >
                        Logout
                    </Button>
                </form>
            </ThemeProvider>

            <div className="flex flex-col items-center">
                {todo.map((item: ITodoModel) => (
                    <Todo
                        key={item.todoId}
                        text={item.text}
                        updateMode={() => updateMode(item.todoId, item.text)}
                        deleteTodo={() => deleteTodo(item.todoId)}
                    />
                ))}

                <div className="flex justify-end">
                    <TablePagination
                        component={"div"}
                        count={totalDocs}
                        page={page - 1}
                        rowsPerPage={limit}
                        onPageChange={(e, val) => setPage(val + 1)}
                        onRowsPerPageChange={(e) => {
                            setLimit(parseInt(e.target.value, 10));
                            setPage(1);
                        }}
                        rowsPerPageOptions={[5, 10]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
