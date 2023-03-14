import { ButtonHTMLAttributes, FC, MouseEvent } from "react";

import classes from "./Button.module.css";

interface IButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className: string;
  disabled?: boolean;
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({
  type,
  className,
  disabled,
  onClick,
  text,
}) => {
  return (
    <button
      type={type || "button"}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
