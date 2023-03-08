import { forwardRef, ChangeEvent } from "react";

import classes from "./Input.module.css";

interface IInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  isValid: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, id, type, value, isValid, onChange, onBlur }, ref) => {
    return (
      <div
        className={`${classes.control} ${
          isValid == false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

export default Input;
