import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from "./routes";
import { Login } from "../containers";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const AppRoutes: FC = () => {
  const { useInfo = {}, isAuthenticated = false } = useSelector(
    (state: RootState) => state.login
  );

  console.log(useInfo, isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute isAuthenticated={isAuthenticated}>
              <Login />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
