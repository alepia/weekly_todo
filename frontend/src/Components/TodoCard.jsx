import React from "react";
import "../sass/TodoCard.scss";

export default function TodoCard(props) {
  return (
    <div className="todo__container">
      <h1 className="todo__title">{props.todoItem}</h1>
      <button onClick={() => props.delete(props.id)}>Delete</button>
    </div>
  );
}
