import React, { useEffect, useState } from "react";
import { LuClipboardCheck, LuMoon, LuSun } from "react-icons/lu";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-x-2">
        <div
          className={`flex justify-center items-center min-w-10 min-h-10 rounded-xl transition-all duration-300 ease-linear ${darkMode ? "bg-blue-900/40 text text-blue-400" : "bg-blue-100 text-blue-600"} hover:scale-105 hover:shadow-sm`}
        >
          <LuClipboardCheck className="text-3xl" />
        </div>
        <span className="text-2xl font-bold">Todo List</span>
      </div>
      <button
        className={`${darkMode ? "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-800/40 hover:text-indigo-300" : "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 hover:text-yellow-600"} relative w-9 h-9 p-2 flex justify-center items-center rounded-xl cursor-pointer transition-colors duration-300 ease-linear`}
        onClick={() => setDarkMode(!darkMode)}
      >
        <LuSun
          size={20}
          className={`absolute transition-all duration-300 ${darkMode ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
        />
        <LuMoon
          size={20}
          className={`absolute transition-all duration-300 ${
            darkMode
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }`}
        />
      </button>
    </div>
  );
};

export default Header;
