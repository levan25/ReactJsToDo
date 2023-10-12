import "../reset.css";
import "../App.css";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "finish React Series",
      isComplite: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "fix car",
      isComplite: false,
      isEditing: false,
    },
    {
      id: 3,
      title: "go build project",
      isComplite: false,
      isEditing: false,
    },
  ]);
  const [todoInput, setTodoInput] = useState("");
  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplite: false,
      },
    ]);
    setTodoInput("");
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }
  function deleteTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }
  function handleInput(event) {
    setTodoInput(event.target.value);
  }
  function compliteTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplite = !todo.isComplite;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function markAsEditing(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function cancelEdit(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function updateTodo(event, id) {
    console.log(event.target.value);
    const updatedTodos = todos.map((todo) => {
      if (event.target.value.trim().length === 0) {
        todo.isEditing = false;
        return todo;
      }
      if (todo.id === id) {
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            value={todoInput}
            onChange={handleInput}
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" onChange={() => compliteTodo(todo.id)} />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplite ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        updateTodo(event, todo.id);
                      } else if (event.key === "Escape") {
                        cancelEdit(event, todo.id);
                      }
                    }}
                    onBlur={(event) => updateTodo(event, todo.id)}
                  />
                )}
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                checked={todo.isComplite ? true : false}
                className="x-button"
              >
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}
