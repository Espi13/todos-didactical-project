import { FC } from "react";

interface ITodoProps {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem: FC<ITodoProps> = ({ name, onEdit, onDelete }) => {
  return (
    <li>
      {name} <i className="fa-solid fa-pen-to-square" onClick={onEdit}></i>{" "}
      <i className="fa-solid fa-trash" onClick={onDelete}></i>
    </li>
  );
};

export default TodoItem;
