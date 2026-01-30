import React from "react";

const Button = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-6 py-3 rounded-xl ${isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 hover:bg-gray-400 hover:text-zinc-800 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"}`}
    >
      {title}
    </button>
  );
};

export default Button;
