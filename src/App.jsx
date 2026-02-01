import React, { useEffect, useMemo, useState } from "react";
import Header from "./Components/Header/Header";
import SearchTodo from "./Components/SearchTodo/SearchTodo";
import Footer from "./Components/Footer/Footer";
import AddTodo from "./Components/AddTodo/AddTodo";
import LightBg from "./Components/Theme/lightBg";
import DarkBg from "./Components/Theme/DarkBg";
import toast, { Toaster } from "react-hot-toast";
import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "./Components/Services/todoApi";
import TodoList from "./Components/TodoList/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
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

  const filteredTodos = useMemo(() => {
    if (filter === "All") return todos;
    if (filter === "Active") return todos.filter((todo) => !todo.completed);
    if (filter === "Complete") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  const visibleTodos = useMemo(() => {
    return filteredTodos.filter((todo) => todo.title.includes(search));
  }, [filteredTodos, search]);

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  const handleAddTodo = async (title) => {
    if (!title) {
      toast.error("The input is empty!");
      return;
    }

    const isTodoExist = todos.some(
      (todo) => todo.title.toLowerCase() === title.toLowerCase(),
    );
    if (isTodoExist) {
      toast.error("The Todo is Exist");
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
          {/* Search Todos */}
          <SearchTodo value={search} onChange={setSearch} />
          {/* Add Task */}
          <AddTodo onAddTodo={handleAddTodo} />
          {/* all Todo */}
          <TodoList
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            filteredTodos={visibleTodos}
            loading={loading}
          />
          {/* footer Todolist */}
          <Footer
            filter={filter}
            setFilter={setFilter}
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
