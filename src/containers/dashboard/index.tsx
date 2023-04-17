import { useDispatch } from "react-redux";
import { clearStore } from "../../store/slices/login";
import { redirect } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(clearStore());
          return redirect("/login");
        }}
      >
        Logout
      </button>
      Dashboard
    </div>
  );
};

export default Dashboard;
