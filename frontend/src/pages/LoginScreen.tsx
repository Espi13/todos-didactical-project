import {
  ChangeEvent,
  FC,
  FormEvent,
  useRef,
  useReducer,
  useState,
  MouseEvent,
} from "react";
import Button from "../components/UI/Button/Button";
import Card from "../components/UI/Card/Card";
import Input from "../components/UI/Input/Input";
import { useAuth } from "../store/AuthContext";
import classes from "./LoginScreen.module.css";

enum InputActions {
  EMAILINPUT = "EMAIL_INPUT",
  EMAILBLUR = "EMAIL_BLUR",
  PASSINPUT = "PASS_INPUT",
  PASSBLUR = "PASS_BLUR",
}

interface InputsState {
  emailValue: string;
  passwordValue: string;
  emailValid: boolean;
  passwordValid: boolean;
}

type EmailInput = {
  type: InputActions.EMAILINPUT;
  payload: string;
};

type EmailBlur = {
  type: InputActions.EMAILBLUR;
};

type PassInput = {
  type: InputActions.PASSINPUT;
  payload: string;
};

type PassBlur = {
  type: InputActions.PASSBLUR;
};

type InputAction = EmailInput | EmailBlur | PassInput | PassBlur;

const formReducer = (state: InputsState, action: InputAction) => {
  const { type } = action;

  switch (type) {
    case InputActions.EMAILINPUT:
      return {
        emailValue: action.payload,
        emailValid: action.payload!.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValid,
      };
    case InputActions.EMAILBLUR:
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes("@"),
        passwordValue: state.passwordValue,
        passwordValid: state.passwordValid,
      };
    case InputActions.PASSINPUT:
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValid,
        passwordValue: action.payload,
        passwordValid:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/g.test(
            action.payload
          ),
      };
    case InputActions.PASSBLUR:
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValid,
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

const LoginScreen: FC = () => {
  const auth = useAuth();

  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: "",
    passwordValue: "",
    emailValid: true,
    passwordValid: true,
  });

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { emailValid, passwordValid } = formState;

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: InputActions.EMAILINPUT,
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: InputActions.PASSINPUT,
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: InputActions.EMAILBLUR });
  };
  const validatePasswordHandler = () => {
    dispatchForm({ type: InputActions.PASSBLUR });
  };

  const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (emailValid && passwordValid) {
      const user = await auth.logIn(
        formState.emailValue,
        formState.passwordValue
      );
    } else if (!emailValid) {
      emailInputRef.current!.focus();
    } else {
      passwordInputRef.current!.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form>
        <Input
          id="email"
          label="Email"
          type="text"
          isValid={emailValid}
          ref={emailInputRef}
          value={formState.emailValue}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordValid}
          ref={passwordInputRef}
          value={formState.passwordValue}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            text="Login"
            onClick={submitHandler}
          />
        </div>
      </form>
    </Card>
  );
};

export default LoginScreen;
