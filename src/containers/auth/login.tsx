import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { redirect } from "react-router-dom";

function Login() {
  const [user, setUser] = useState<any>({});
  const [profile, setProfile] = useState<any>([]);

  const newFu = (res: any) => {
    setUser(res);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      console.log(codeResponse, "codeResponse");
      window.location.href = `https://localhost:5173/login?access_token=${codeResponse?.access_token}`;
      newFu(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res, "res__");
          redirect("http://localhost:5173/login");
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  console.log(user);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default Login;
