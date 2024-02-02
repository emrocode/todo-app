export type TodoBar = {
  handleReset: () => void;
  handleSave: () => void;
};

export type Todo = {
  id: string;
  todo: string;
  completed: boolean;
};
