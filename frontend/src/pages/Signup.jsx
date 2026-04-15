import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Signup() {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  console.log("Data", Data);
  const HandleRegister = async () => {
    try {
      console.log("start");
      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        Data,
      );
      console.log(res);
      toast.success("User Registered Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const HandleChange = (event) => {
    setData({ ...Data, [event.target.name]: event.target.value });
  };
  return (
    <div className="pt-[50px] min-h-[100vh]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleRegister();
        }}
        className="flex flex-col justify-center gap-5 items-center mx-auto   w-[300px] md:w-[400px]  bg-white p-7"
      >
        <h2 className="font-bold md:text-2xl">
          Sign up <span className="text-green-900">Form</span>
        </h2>
        <input
          type="text"
          onChange={(e) => HandleChange(e)}
          placeholder="Name"
          name="name"
          required
          className="border text-[13px] md:text-[20px] border-gray-300 rounded-md p-1 w-full"
        />
        <input
          type="email"
          onChange={(e) => HandleChange(e)}
          required
          name="email"
          placeholder="Email"
          className="border text-[13px] md:text-[20px] border-gray-300 rounded-md p-1 w-full"
        />
        <input
          required
          onChange={(e) => HandleChange(e)}
          name="password"
          type="password"
          placeholder="Password"
          className="border text-[13px] md:text-[20px] border-gray-300 rounded-md p-1 w-full"
        />
        <input
          required
          onChange={(e) => HandleChange(e)}
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          className="border text-[13px] md:text-[20px] border-gray-300 rounded-md p-1 w-full"
        />
        <button
          type="submit"
          className="border w-[70%] rounded-2xl mt-3 p-2 text-[13px] md:text-[20px]  border border-green-900 text-gray-700 hover:bg-green-900 hover:text-white cursor-pointer"
        >
          {" "}
          Sign Up
        </button>

        <p className="text-gray-500 text-[13px] md:text-[20px] mt-3">
          Already Have an Account ?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
