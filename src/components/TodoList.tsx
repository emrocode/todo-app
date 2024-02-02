import css from "../styles/TodoList.module.css";
import { ChangeEvent, useEffect } from "react";
import { MSGS } from "../data";
import type { Todo } from "../types";

const Todo = ({ id, todo, completed }: Todo) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isCompleted = e.target.checked;

    const updateTodoAndStorage = (todos: Todo[]) => {
      const updatedTodos = todos.map((item: Todo) =>
        item.id === id ? { ...item, completed: isCompleted } : item,
      );

      window.localStorage.setItem("savedTodos", JSON.stringify(updatedTodos));
    };

    const storedTodos = JSON.parse(
      window.localStorage.getItem("savedTodos") || "[]",
    );

    const span = e.target.nextSibling as HTMLElement | null;
    if (span) {
      span.style.textDecoration = isCompleted ? "line-through" : "none";
      updateTodoAndStorage(storedTodos);
    }
  };

  const updateCheckbox = (id: string, completed: boolean) => {
    const checkbox = document.getElementById(id) as HTMLInputElement | null;
    const span = checkbox?.nextSibling as HTMLElement | null;

    if (checkbox && span) {
      checkbox.checked = completed;
      span.style.textDecoration = completed ? "line-through" : "none";
    }
  };

  useEffect(() => {
    updateCheckbox(id, completed);
  }, [completed, id]);

  return (
    <section>
      {id && (
        <label title={MSGS[2]} className={css.label}>
          <input
            type="checkbox"
            id={id}
            className={css.todo}
            tabIndex={-1}
            onChange={handleCheckboxChange}
          />
          <span style={{ textDecoration: "none" }}>{todo}</span>
        </label>
      )}
    </section>
  );
};

export default Todo;
