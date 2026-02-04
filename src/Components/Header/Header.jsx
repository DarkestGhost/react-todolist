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
        onClick={() => setDarkMode(!darkMode)}
        className={`relative w-9 h-9 p-2 flex justify-center items-center rounded-xl cursor-pointer transition-all duration-300 ease-linear ${
          darkMode
            ? "bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-700 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            : "bg-indigo-100 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-200 shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
        }`}
      >
        <LuSun
          size={20}
          className={`absolute transition-all duration-300 ${
            darkMode
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          }`}
        />
        <LuMoon
          size={20}
          className={`absolute transition-all duration-300 ${
            darkMode
              ? "scale-0 -rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
        />
      </button>
    </div>
  );
};

export default Header;
