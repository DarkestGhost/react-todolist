import React, { useState } from "react";
import { LuPencil, LuTrash2, LuCircleCheck } from "react-icons/lu";

const Todo = ({ id, title, completed, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleSaveNewTitle = () => {
    const value = newTitle.trim();
    if (!value) {
      setNewTitle("");
      setIsEditing(false);
      return;
    }

    if (value === title) {
      setIsEditing(false);
      return;
    }

    onEditTodo(id, { title: value });
    setNewTitle("");
    setIsEditing(false);
  };

  const handleKeyDownInput = ({ key }) => {
    if (key === "Enter") handleSaveNewTitle();
    if (key === "Escape") {
      setNewTitle("");
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-3 bg-white/80 text-gray-900 dark:bg-gray-700 dark:text-gray-100 transition duration-300 ease-linear shadow-md rounded-xl`}
    >
      <div className="flex items-center gap-x-2 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            onEditTodo(id, { completed: true });
          }}
          className="appearance-none w-4 h-4 shrink-0 border-gray-300/10 bg-gray-300/30 hover:bg-emerald-200/50 checked:bg-emerald-600 checked:border-emerald-600 checked:hover:bg-emerald-700 transition-colors duration-300 ease-linear rounded cursor-pointer"
        />
        {isEditing ? (
          <input
            className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none rounded-md"
            autoFocus
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onBlur={handleSaveNewTitle}
            onKeyDown={handleKeyDownInput}
            type="text"
            placeholder="Edit task..."
          />
        ) : completed ? (
          <del>{title}</del>
        ) : (
          <span>{title}</span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <div className="relative w-9 h-9 flex justify-center items-center rounded-xl transition-colors duration-300 ease-linear shadow-sm">
          <a
            onClick={() => {
              setIsEditing(true);
            }}
            href="#"
            className={`absolute bg-gray-300/10 p-2 rounded-xl hover:bg-gray-300/30 dark:bg-gray-400/10 dark:hover:bg-gray-400/20 transition-all duration-300 ease-linear ${completed ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"} `}
          >
            <LuPencil size={20} />
          </a>

          <div
            className={`absolute bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 p-2 rounded-xl transition-all duration-300 ease-linear ${
              completed
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
            } `}
          >
            <LuCircleCheck size={20} />
          </div>
        </div>

        <a
          onClick={() => onDeleteTodo(id)}
          href="#"
          className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white p-2 rounded-xl transition-all duration-300 ease-linear shadow-sm"
        >
          <LuTrash2 size={20} />
        </a>
      </div>
    </div>
  );
};

export default Todo;
