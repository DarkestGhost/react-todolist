import React from "react";

const PaginationButton = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i < totalPages + 1; i++) pages.push(i);

  return (
    <div className="flex justify-center items-center gap-x-2 mt-4">
      {pages.map((page) => (
        <button
          type="button"
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded-xl ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 hover:bg-gray-400 hover:text-zinc-800 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationButton;
