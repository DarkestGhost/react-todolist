import React from "react";

const PaginationButton = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const getPagesNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i < totalPages + 1; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-x-2 mt-4">
      {getPagesNumbers().map((page) => (
        <button
          type="button"
          onClick={() => typeof page === "number" && setCurrentPage(page)}
          className={`px-3 py-1 rounded-xl ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 hover:bg-gray-400 hover:text-zinc-800 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationButton;
