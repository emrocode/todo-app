import css from "../styles/TodoList.module.css";
import { useState, useEffect } from "react";
import { MSGS } from "../data";
import { Check, X } from "lucide-react";
import type { Todo } from "../types";

const Todo = ({ id, todo, completed }: Todo) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);
  const [isRemoved, setIsRemoved] = useState<boolean>();
  const storageKey = "savedTodos";

  const handleButtonClick = () => {
    setIsCompleted((prev) => {
      const storedTodos = JSON.parse(
        window.localStorage.getItem(storageKey) || "[]",
      );

      // Update localStorage
      const updatedTodos = storedTodos.map((item: Todo) =>
        item.id === id ? { ...item, completed: !prev } : item,
      );

      window.localStorage.setItem(storageKey, JSON.stringify(updatedTodos));

      return !prev;
    });
  };

  const deleteTodo = (id: string) => {
    const storedTodos = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const updatedTodos = storedTodos.filter((todo: Todo) => todo.id !== id);

    window.localStorage.setItem(storageKey, JSON.stringify(updatedTodos));

    setIsRemoved(true);
  };

  useEffect(() => {
    setIsCompleted(completed);
    setIsRemoved(isRemoved);
  }, []);

  // Hide removed todos
  if (isRemoved) {
    return null;
  }

  return (
    <>
      <div className={css.label}>
        <span style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
          {todo}
        </span>
        {!isCompleted && (
          <button
            type="button"
            aria-label={MSGS[2]}
            title={MSGS[2]}
            className={css.checkButton}
            onClick={() => handleButtonClick()}
          >
            <Check size={13} />
          </button>
        )}
        <button
          type="button"
          aria-label={MSGS[3]}
          title={MSGS[3]}
          className={css.deleteButton}
          onClick={() => deleteTodo(id)}
        >
          <X size={13} />
        </button>
      </div>
    </>
  );
};

export default Todo;
