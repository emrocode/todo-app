import css from "../styles/Todo.module.css";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { MSGS } from "../data";
import TodoBar from "./TodoBar";
import TodoList from "./TodoList";
import type { Todo } from "../types";

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");

  // Load todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(
      window.localStorage.getItem("savedTodos") || "[]",
    );
    setTodos(storedTodos);
  }, []);

  const watchTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };

  // Reset text box
  const handleReset = () => {
    if (todo.trim() !== "") {
      const isConfirmed = window.confirm(MSGS[0]);

      if (isConfirmed) {
        setTodo("");
      }
    }
  };

  const handleSave = () => {
    // Generate a unique ID from date
    const uniqueId = Date.now().toString();
    const completed = false;

    const newTodo: Todo = {
      id: uniqueId,
      todo,
      completed,
    };

    const dataToSave = [...todos, newTodo];

    // Add new todo
    if (todo.trim() !== "") {
      window.localStorage.setItem("savedTodos", JSON.stringify(dataToSave));
      setTodos([...todos, newTodo]);
      setTodo("");
      toast.success(`${MSGS[1]} ${newTodo.id}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.altKey && event.key === "s") || event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <section>
      <input
        value={todo}
        type="text"
        role="textbox"
        className={css.textbox}
        autoFocus
        placeholder="Write something..."
        onChange={watchTodo}
        onKeyDown={handleKeyPress}
      />
      <TodoBar handleReset={handleReset} handleSave={handleSave} />
      <div className={css.todoList}>
        {todos.map((item) => (
          <TodoList
            key={item.id}
            id={item.id}
            todo={item.todo}
            completed={item.completed}
          />
        ))}
      </div>
      {/* Sonner: An opinionated toast component for React. See https://sonner.emilkowal.ski/ */}
      <Toaster position="bottom-right" />
    </section>
  );
};

export default Todo;
