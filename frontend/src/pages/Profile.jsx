import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { FaArrowLeft } from "react-icons/fa";
function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  console.log("cur", currentUser);
  const [Data, setData] = useState({
    name: "",
  });
  useEffect(() => {
    if (currentUser) {
      setData({
        name: currentUser.user.data.name,
      });
    }
  }, []);
  const HandleUpdate = async () => {
    try {
      console.log("start");
      const res = await axios.post(
        "http://localhost:5000/api/user/updatename",
        Data,
        { withCredentials: true },
      );
      console.log(res);
      toast.success("Name Updated Successfully!");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const HandleChange = (event) => {
    setData({ ...Data, [event.target.name]: event.target.value });
  };
  return (
    <div className="min-h-[100vh] p-9 ">
      <Link to="/">
        <FaArrowLeft />
      </Link>
      {!currentUser ? (
        <p>Loading</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleUpdate();
          }}
          className="flex flex-col justify-center gap-5 items-center mx-auto   w-[250px] md:w-[600px]  bg-white p-7"
        >
          <h2 className="font-bold md:text-2xl">
            <span className="text-green-900">Profile</span>
          </h2>

          <input
            type="text"
            onChange={(e) => HandleChange(e)}
            placeholder="Name"
            name="name"
            value={Data.name}
            required
            className="border text-[13px] md:text-[16px] border-gray-300 rounded-md p-1 w-full"
          />
          <input
            type="email"
            required
            disabled
            name="email"
            value={currentUser?.user?.data.email}
            placeholder="Email"
            className="border text-[13px] md:text-[16px] border-gray-300 text-gray-300 rounded-md p-1 w-full"
          />

          {/* <input
          required
          onChange={(e) => HandleChange(e)}
          type="password"
          name="confirmpassword"
          placeholder="Write your current Password"
          className="border text-[13px] md:text-[16px] border-gray-300 rounded-md p-1 w-full"
        />

        <input
          required
          onChange={(e) => HandleChange(e)}
          name="newpassword"
          type="password"
          placeholder="Write New Password"
          className="border text-[13px] md:text-[16px] border-gray-300 rounded-md p-1 w-full"
        />
        <input
          required
          onChange={(e) => HandleChange(e)}
          type="password"
          name="newconfirmpassword"
          placeholder="Confirm New Password"
          className="border text-[13px] md:text-[16px] border-gray-300 rounded-md p-1 w-full"
        /> */}

          <button
            type="submit"
            className="border w-[70%] rounded-2xl mt-3 p-2 text-[13px] md:text-[16px]  border border-green-900 text-gray-700 hover:bg-green-900 hover:text-white cursor-pointer"
          >
            {" "}
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
