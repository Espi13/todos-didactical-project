import { FC, useEffect } from "react";
import { useTodos } from "../../store/TodosContext";
import TodoItem from "./TodoItem";

const TodoList: FC = () => {
  const todos = useTodos();

  useEffect(() => {
    todos.getAllTodos();
  }, []);

  const handlerEditTodo = () => {};

  const handlerDeleteTodo = (id: number) => {
    todos.removeTodo(id);
  };

  return (
    <ul>
      {todos.items.map((todo) => (
        <TodoItem
          key={todo.id}
          name={todo.name}
          onEdit={handlerEditTodo}
          onDelete={() => handlerDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
