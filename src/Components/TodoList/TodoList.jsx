import React, { useMemo, useState } from "react";
import Todo from "../Todo/Todo";
import PaginationButton from "./PaginationButton";
import { TailSpin } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

const TodoList = ({ loading, filteredTodos, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 4;
  const totalPages = Math.ceil(filteredTodos.length / PAGE_SIZE);
  const safePage = currentPage > totalPages ? totalPages : currentPage;

  const paginatedTodos = useMemo(() => {
    const endIndex = safePage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;

    return filteredTodos.slice(startIndex, endIndex);
  }, [filteredTodos, safePage]);
  return (
    <div className="mt-6 space-y-3">
      <AnimatePresence mode="popLayout">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center mt-4"
          >
            <TailSpin width={40} height={40} color="#4fa94d" />
          </motion.div>
        ) : paginatedTodos.length ? (
          paginatedTodos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <Todo
                key={todo.id}
                {...todo}
                onDeleteTodo={onDelete}
                onEditTodo={onEdit}
              />{" "}
            </motion.div>
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-800 dark:text-zinc-200 text-center lg:text-base text-sm"
          >
            There is no task...
          </motion.div>
        )}
        <PaginationButton
          totalPages={totalPages}
          currentPage={safePage}
          setCurrentPage={setCurrentPage}
        />
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
