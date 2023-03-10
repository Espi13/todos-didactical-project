import classes from "./Button.module.css";

const button = (props) => {
  return (
    <button
      type={props.type}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
