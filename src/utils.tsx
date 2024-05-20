import { Todo } from "./components/Todos";

export const generateTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    const todos = [];
    for (let i = 1; i <= 10000; i++) {
      todos.push({
        id: i,
        title: `Todo ${i}`,
        completed: Math.random() > 0.5,
      });
    }
    resolve(todos);
  });
};
