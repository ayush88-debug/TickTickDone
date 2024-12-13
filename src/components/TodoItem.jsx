import "../App.css";
import { useEffect, useState } from "react";
import {
  updatetodo,
  deleteToto,
  toggleTodo,
  toggleEditing
} from "../features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function TodoItem() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [anyEditing, setAnyEditing] = useState(false);
  const [updatedText, setUpdatedtext] = useState("");

  const handleUpdate = (todoId) => {
    dispatch(updatetodo({ id: todoId, text: updatedText }));
    dispatch(toggleEditing({ id: todoId }));
    setAnyEditing(false);
  };

  //Local Storage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  

  return (
    <ul className="space-y-2">
      {todos
        .filter((todo) => !todo.completed)
        .map((todo) => (
          <li
            className={`flex items-center gap-2 p-2  ${
              todo.completed ? "bg-green-200" : "bg-gray-50"
            } rounded`}
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                if (!todo.editing) {
                  dispatch(toggleTodo({ id: todo.id }));
                }
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            {todo.editing ? (
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedtext(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    if (updatedText.trim() == "") {
                      dispatch(deleteToto({ id: todo.id }));
                      setAnyEditing(false);
                    } else {
                      handleUpdate(todo.id);
                    }
                  }
                }}
                className="flex-grow px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 input-border"
                autoFocus
              />
            ) : (
              <span
                className={`flex-grow ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            )}
            {!todo.editing && (
              <>
                <button
                  className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                  onClick={() => {
                    if (!todo.completed && !anyEditing) {
                      dispatch(toggleEditing({ id: todo.id }));
                      setAnyEditing(true);
                      setUpdatedtext(todo.text);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  className="p-1 text-red-600 hover:text-red-800 focus:outline-none"
                  onClick={() => dispatch(deleteToto({ id: todo.id }))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
          </li>
        ))}

      <p>Completed</p>

      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
          <li
            className={`flex items-center gap-2 p-2  ${
              todo.completed ? "bg-green-200" : "bg-gray-50"
            } rounded`}
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                if (!todo.editing) {
                  dispatch(toggleTodo({ id: todo.id }));
                }
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <>
              <button
                className="p-1 text-red-600 hover:text-red-800 focus:outline-none"
                onClick={() => dispatch(deleteToto({ id: todo.id }))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          </li>
        ))}
    </ul>
  );
}

export default TodoItem;
