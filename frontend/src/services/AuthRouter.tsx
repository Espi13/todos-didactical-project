import { FC } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../store/AuthContext";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ outlet }) => {
  const auth = useAuth();
  console.log("Valor de auth", auth);
  if (auth.isLoggedIn) {
    return outlet;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
