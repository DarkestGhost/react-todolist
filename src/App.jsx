import React, { useEffect, useMemo, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AddTodo from "./Components/AddTodo/AddTodo";
import Todo from "./Components/Todo/Todo";
import LightBg from "./Components/Theme/lightBg";
import DarkBg from "./Components/Theme/DarkBg";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "./Components/Services/todoApi";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [fillter, setFillter] = useState("All");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getTodos();
        setTodos(res.data);
      } catch (err) {
        console.log(err);
        setError("An error occurred while fetching todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const fillteredTodos = useMemo(() => {
    if (fillter === "All") return todos;
    if (fillter === "Active") return todos.filter((todo) => !todo.completed);
    if (fillter === "Complete") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, fillter]);

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  const handleAddTodo = async (title) => {
    if (!title.trim()) {
      toast.error("The input is empty!");
      return;
    }

    try {
      const res = await addTodo(title);
      setTodos((prevTodo) => [...prevTodo, res.data]);
      toast.success("The task added successfully.");
    } catch (err) {
      console.log(err);
      setError("An error occurred while adding todo.");
      toast.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      toast.success("The task deleted successfully.");
    } catch (err) {
      console.log(err);
      setError("An error occurred while deleting todo.");
      toast.error(error);
    }
  };

  const handleEditTodo = async (id, data) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...data } : todo)),
    );
    try {
      await editTodo(id, data);
    } catch (err) {
      console.log(err);
      setError("An error occurred while editing todo.");
      toast.error(error);
    }
  };

  return (
    <>
      <div className="min-w-full min-h-dvh flex justify-center items-center p-4">
        {/* light bg overlay */}
        <LightBg />
        {/* dark bg overlay */}
        <DarkBg />
        {/* card */}
        <div className="w-full sm:w-125 md:w-150 lg:w-1/3 p-6 flex flex-col justify-center bg-white/80 dark:bg-zinc-800/50 dark:text-zinc-100 backdrop-blur-md shadow-md rounded-xl transition-colors duration-300 ease-linear">
          {/* header Todolist */}
          <Header />
          {/* Add Task */}
          <AddTodo onAddTodo={handleAddTodo} />
          {/* all Todo */}
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
              ) : fillteredTodos.length ? (
                fillteredTodos.map((todo) => (
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
                      onDeleteTodo={handleDeleteTodo}
                      onEditTodo={handleEditTodo}
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
            </AnimatePresence>
          </div>
          {/* footer Todolist */}
          <Footer
            fillter={fillter}
            setFillter={setFillter}
            taskLeft={activeTodoCount}
          />
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          error: {
            style: {
              backgroundColor: "var(--toastError-bg)",
              color: "var(--toastError-color)",
              border: "1px solid var(--toastError-border)",
            },
          },
          success: {
            style: {
              backgroundColor: "var(--toastSuccess-bg)",
              color: "var(--toastSuccess-color)",
              border: "1px solid var(--toastSuccess-border)",
            },
          },
        }}
      />
    </>
  );
};

export default App;
