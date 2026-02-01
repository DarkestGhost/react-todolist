import React from "react";
import { LuSearch } from "react-icons/lu";

const SearchTodo = ({ value, onChange }) => {
  return (
    <div className="relative flex flex-col sm:flex-row gap-3 mt-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <LuSearch size={20} className="text-gray-400" />
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full p-3 pl-10 placeholder-gray-400 text-gray-900 bg-white/80 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white dark:focus:bg-gray-900 transition-all ease-linear rounded-4xl shadow-md"
        type="text"
        placeholder="Search Todos..."
      />
    </div>
  );
};

export default SearchTodo;
