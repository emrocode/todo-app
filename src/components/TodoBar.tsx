import css from "../styles/TodoBar.module.css";
import { Eraser, Plus } from "lucide-react";
import type { TodoBar } from "../types";

const TodoBar = ({ handleReset, handleSave }: TodoBar) => {
  return (
    <section>
      <div className={css.bar}>
        <span className={css.shortcut}>
          <code>alt + s</code>
          <span>to add</span>
        </span>
        <div className={css.menu}>
          <button type="reset" onClick={handleReset} className={css.button}>
            <Eraser size={13} />
            <span className={css.text}>clear</span>
          </button>
          <button type="button" onClick={handleSave} className={css.button}>
            <Plus size={13} />
            <span className={css.text}>add</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoBar;
