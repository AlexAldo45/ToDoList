import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  editTodo,
  toggleTodo,
  setFilter,
} from "../redux/store";
import "../css/style.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import fontawesome from "@fortawesome/fontawesome";

fontawesome.library.add(faPen, faTrash);

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const text = input.value.trim();
    if (text) {
      dispatch(addTodo(text));
      input.value = "";
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (id, text) => {
    const newText = prompt("Ubah nama Todo:", text);
    if (newText) {
      dispatch(editTodo(id, newText));
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  function activeOne() {
    handleFilterChange("all");
    handleClick(1);
  }
  function activeTwo() {
    handleFilterChange("active");
    handleClick(2);
  }
  function activeThere() {
    handleFilterChange("completed");
    handleClick(3);
  }
  const filteredTodos =
    filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input type="text" placeholder="What to do" />
        <button type="submit">Add</button>
      </form>
      <div className="buttonFilter">
        <button
          style={{
            backgroundColor: activeButton === 1 ? "#08ac9c" : "#788c94",
            borderRadius: "15px",
            padding: "5px 14px",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => activeOne()}
        >
          ALL
        </button>
        <button
          style={{
            backgroundColor: activeButton === 2 ? "#08ac9c" : "#788c94",
            borderRadius: "15px",
            padding: "5px 14px",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => activeTwo()}
        >
          ACTIVE
        </button>
        <button
          style={{
            backgroundColor: activeButton === 3 ? "#08ac9c" : "#788c94",
            borderRadius: "15px",
            padding: "5px 14px",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => activeThere()}
        >
          COMPLETED
        </button>
      </div>
      {filteredTodos.map((todo) => (
        <div
          className="output"
          key={todo.id}
        >
          <div className="flex-output">
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              float: 'left',
              width: '300px',
             }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span
                key={todo.id}
                style={{ textDecoration: todo.completed ? "line-through" : "none",
                marginLeft: '7px',
                fontSize: '18px',
                fontFamily: 'sans-serif',
                display: 'inline-block',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
               }}
              >{todo.text}</span>
            </div>
            <div 
              className="action-right"
              style={{ display: todo.completed ? "none" : "block" }}
            >
              <button
                className="action"
                onClick={() => handleEditTodo(todo.id, todo.text)}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-pen"
                  style={{ 
                    color: "#495c6a",
                    height: '17px'
                 }}
                />
              </button>
              <button
                className="action"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                <FontAwesomeIcon icon={faTrash} style={{ 
                  color: "#495c6a",
                  height: '17px'
                }} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
