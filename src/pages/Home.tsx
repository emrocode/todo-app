import { Todo, TodoList } from "../components";

export default function Home() {
  return (
    <section className="mt-6">
      <Todo />
      <TodoList />
    </section>
  );
}
