import api from "./api";

export const getTodos = async () => {
  return api.get("/todos");
};

export const addTodo = async (title) => {
  return api.post("/todos", {
    title,
    completed: false,
  });
};

export const editTodo = async (id, data) => {
  return api.patch(`/todos/${id}`, data);
};

export const deleteTodo = async (id) => {
  return api.delete(`/todos/${id}`);
};
