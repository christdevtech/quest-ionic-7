import React from "react";
import { Redirect } from "react-router";
import { useAuthContext } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuthContext() ?? { user: undefined };
  if (!user) {
    return <Redirect to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
