import React, { useState, useRef } from "react";

const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  const handleChangeAddTodoInput = () => {
    onAddTodo(title);
    setTitle("");
    inputRef.current.focus();
  };

  const handleKeyDownInput = ({ key }) => {
    if (key === "Enter") handleChangeAddTodoInput();
    if (key === "Escape") inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => handleKeyDownInput(event)}
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        className="w-full sm:w-4/5 p-3 placeholder-gray-400 text-gray-900 bg-white/80 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white dark:focus:bg-gray-900 transition-all ease-linear rounded-xl shadow-md"
      />
      <button
        type="submit"
        onClick={() => handleChangeAddTodoInput()}
        className="w-full sm:w-auto px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-400 transition-colors duration-300 ease-linear font-semibold shadow-md cursor-pointer rounded-xl"
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
