import { FC, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <ToastContainer />
        <AppRoutes />
      </Suspense>
    </div>
  );
};

export default App;
