import { ReactElement } from "react";
import { RouteProps } from "react-router-dom";

export type AuthRouteProps = {
  children: ReactElement;
  isAuthenticated: boolean;
} & RouteProps;

export type ProtectedRouteProps = {
  children: ReactElement;
  isAuthenticated: boolean;
  permissions: string[];
  givenPermissions: string;
} & RouteProps;
