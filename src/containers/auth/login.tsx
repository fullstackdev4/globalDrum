import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";

import { setAuthenticated } from "../../store/slices/login";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setAuthenticated(true));
        return redirect("/");
      }}
    >
      Login
    </button>
  );
};
export default Login;
