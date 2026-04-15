import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const [Data, setData] = useState({ email: "", password: "" });
  const [Loading, setLoading] = useState(false);
  const { HandleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const HandleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const HandleLogin2 = async () => {
    try {
      setLoading(true);
      await HandleLogin(Data);
      setLoading(false);
      toast.success("Logged In Successfully");
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-[50px] min-h-[100vh]">
      <form
        onSubmit={(e) => {
          (e.preventDefault(), HandleLogin2());
        }}
        className="flex flex-col justify-center gap-5 items-center mx-auto   w-[300px] md:w-[400px]  bg-white p-7"
      >
        <h2 className="font-bold md:text-2xl">
          Login <span className="text-green-900">Form</span>
        </h2>

        <input
          type="email"
          required
          name="email"
          onChange={(e) => HandleChange(e)}
          placeholder="Email"
          className="border text-[13px] md:text-[20px] border-gray-300 rounded-md p-1 w-full"
        />
        <input
          required
          type="password"
          name="password"
          onChange={(e) => HandleChange(e)}
          placeholder="Password"
          className="border text-[13px] md:text-[20px] border-gray-300 rounded-md p-1 w-full"
        />

        <button className="border w-[70%] rounded-2xl mt-3 p-2 text-[13px] md:text-[20px]  border border-green-900 text-gray-700 hover:bg-green-900 hover:text-white cursor-pointer">
          {" "}
          {Loading ? "Logging In " : "Login"}
        </button>

        <p className="text-gray-500 text-[13px] md:text-[20px] mt-3">
          Don't you Have an Account ?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
