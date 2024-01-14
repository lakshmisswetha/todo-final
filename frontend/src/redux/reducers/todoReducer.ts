import { ActionTypes } from "../constants/action-types";
export interface ITodoModel {
    todoId: string;
    text: string;
}
export interface TodoState {
    todos: ITodoModel[];
}

const initialState: TodoState = {
    todos: [],
};

const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.UPDATE_TODOS:
            return {
                ...state,
                todos: action.payload,
            };
        case ActionTypes.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, { text: action.payload.text }],
            };
        case ActionTypes.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.todoId === action.payload.todoId
                        ? { ...todo, text: action.payload.text }
                        : todo
                ),
            };
        case ActionTypes.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.todoId !== action.payload.todoId),
            };
        case ActionTypes.REMOVE:
            return {};

        default:
            return state;
    }
};

export default todoReducer;
