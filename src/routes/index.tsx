import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./routes";
import { Contact, Dashboard, Login, NoAccess } from "../containers";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { PERMISSION_NAMES } from "../constants/permissions";
import RssFeed from "../containers/rssFeed";

const AppRoutes: FC = () => {
  const {
    useInfo = {},
    isAuthenticated = false,
    permissions,
  } = useSelector((state: RootState) => state.login);

  console.log(useInfo, isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />

        <Route path="/rss-feed" element={<RssFeed />} />

        <Route path="/403" element={<NoAccess />} />

        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              permissions={permissions}
              givenPermissions={PERMISSION_NAMES["show_dashboard"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
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
