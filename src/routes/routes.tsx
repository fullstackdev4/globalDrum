import { Navigate } from "react-router-dom";
import { AuthRouteProps, ProtectedRouteProps } from "./types";
import { hasPermissions } from "../helpers/permissions.helper";

const ProtectRedirectTo: string = "/login";

const AuthRedirectTo: string = "/";

// // pages access before login
export const AuthRoute = ({
  children,
  isAuthenticated = false,
}: AuthRouteProps) => {
  return !isAuthenticated ? children : <Navigate to={AuthRedirectTo} />;
};

// pages access after login successfully
export const ProtectedRoute = ({
  children,
  isAuthenticated,
  permissions = [],
  givenPermissions = "",
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={ProtectRedirectTo} />;
  }

  // if (!hasPermissions(permissions, givenPermissions)) {
  //   return <Navigate to={{ pathname: "/403" }} />;
  // }

  return children;
};
