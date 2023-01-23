import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux-toolkit/authSlice";
import {
  getTodosThunk,
  addTodoThunk,
  deleteTodoThunk,
} from "../redux-toolkit/todoSlice";
import AddTodo from "../Components/AddTodo";
import TodoCard from "../Components/TodoCard";
import "../sass/Todos.scss";

export default function Todos() {
  const todos = useSelector((store) => store.todos.todoList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosThunk());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="todos">ToDo's</h1>
      {todos.map((obj) => (
        <div className="todo_card" key={obj.id}>
          <TodoCard
            className="carta"
            todoItem={obj.todo}
            id={obj.id}
            delete={(id) => dispatch(deleteTodoThunk(id))}
          />
        </div>
      ))}
      <div className="addTodo">
        <AddTodo
          newTodo={(todo) => {
            dispatch(addTodoThunk(todo));
          }}
        />
        <button className="logout" onClick={() => dispatch(logoutThunk())}>
          Logout
        </button>
      </div>
    </div>
  );
}
