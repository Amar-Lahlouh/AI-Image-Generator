import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const HandleLogin = async (Data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        Data,
        {
          withCredentials: true,
        },
      );

      const user = res.data?.user;
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    const refresh = async () => {
      const res = await axios.post(
        "http://localhost:5000/api/user/refresh",
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      if (!res.data.valid) return console.log("not valid token");
      console.log("twst");
      console.log("-".repeat(50));
      const userRes = await axios.get(`http://localhost:5000/api/user/getme`, {
        withCredentials: true,
      });
      console.log("userRes", userRes);
      let userData = userRes.data;
      console.log("userdata", userData);
      setCurrentUser({ user: userData });
    };
    currentUser || refresh();
    console.log(currentUser);
  }, []);
  const logout = async () => {
    await axios.post(
      "http://localhost:5000/api/user/logout",
      {},
      {
        withCredentials: true,
      },
    );
    setCurrentUser(null);
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, HandleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
