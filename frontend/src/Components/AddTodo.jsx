import React, { useState } from "react";


export default function AddTodo(props) {
  const [todoItem, setTodoItem] = useState("");

  const handleChange = (event) => {
    setTodoItem(event.target.value);
  };

  return (
    <div className="add__container">
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        value={todoItem}
      />
      <br />
      <button
        onClick={() => {
          props.newTodo(todoItem);
          setTodoItem("");
        }}
      >
        New Todo
      </button>
    </div>
  );
}
