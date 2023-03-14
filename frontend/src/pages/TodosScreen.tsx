import { FC, useEffect } from "react";
import AddEditTodo from "../components/Todos/AddEditTodo";
import TodoList from "../components/Todos/TodoList";

const TodosScreen: FC = () => {
  return (
    <>
      <AddEditTodo />
      <TodoList />
    </>
  );
};

export default TodosScreen;
