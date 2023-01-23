import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      console.log("add todo", state.todoList);
      state.todoList.push(action.payload);
    },
    deleteTodo: (state, action) => {
      console.log("delete todo", state.todoList);
      let index = state.todoList.findIndex((obj) => obj.id === action.payload);
      console.log("index", index);
      state.todoList.splice(index, 1);
    },
  },
});

export const getTodosThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await axios(`http://localhost:8080/api/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getTodos", response.data);
  dispatch(getTodos(response.data));
};

export const addTodoThunk = (todoItem) => async (dispatch) => {
  const token = localStorage.getItem("token");
  let response = await axios.post(
    `http://localhost:8080/api/todo`,
    { todoItem },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  dispatch(addTodo({ id: response.data.id, todo: todoItem }));
};

export const deleteTodoThunk = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:8080/api/todo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch(deleteTodo(id));
};

export const { getTodos, addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
