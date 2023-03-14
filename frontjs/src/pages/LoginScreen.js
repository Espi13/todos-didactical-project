import { useRef, useReducer } from "react";
import Card from "../components/UI/Card/Card";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";

import classes from "./LoginScreen.module.css";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router";

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        emailValue: action.emailValue,
        emailValid: action.emailValue.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValid,
      };
    case "EMAIL_BLUR":
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValid,
      };
    case "PASS_INPUT":
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes("@"),
        passwordValue: action.passwordValue,
        passwordValid:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/g.test(
            action.passwordValue
          ),
      };
    case "PASS_BLUR":
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/g.test(
            state.passwordValue
          ),
      };
    default:
      return state;
  }
};

const LoginScreen = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: "",
    emailValid: true,
    passwordValue: "",
    passwordValid: true,
  });
  const { emailValid, passwordValid, emailValue, passwordValue } = formState;

  const emailChangeHandler = (event) => {
    dispatchForm({
      type: "EMAIL_INPUT",
      emailValue: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({
      type: "PASS_INPUT",
      passwordValue: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchForm({
      type: "EMAIL_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchForm({
      type: "PASS_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      auth.logIn(emailValue, passwordValue);
      //   navigate("/todos");
    } else if (!emailValid) {
      emailInputRef.current.focus();
    } else if (!passwordValid) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Email"
          type="text"
          value={formState.emailValue}
          ref={emailInputRef}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={formState.passwordValue}
          ref={passwordInputRef}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginScreen;
