import { ActionTypes } from "../constants/action-types";

export const loadTodos = (todos: any) => ({
    type: ActionTypes.UPDATE_TODOS,
    payload: todos,
});

export const addTodoRedux = (text: String) => ({
    type: ActionTypes.ADD_TODO,
    payload: text,
});

export const updateTodoRedux = (todoId: String, text: String) => ({
    type: ActionTypes.UPDATE_TODO,
    payload: { todoId, text },
});

export const deleteTodoRedux = (todoId: String) => ({
    type: ActionTypes.DELETE_TODO,
    payload: todoId,
});

export const remove = (todos: any) => ({
    type: ActionTypes.REMOVE,
});
