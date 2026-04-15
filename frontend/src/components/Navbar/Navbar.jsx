import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FaUserLarge } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const HandleLogout = async () => {
    try {
      await logout();
    } catch (err) {}
  };
  return (
    <div className="flex justify-end">
      {currentUser ? (
        <>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className=" w-10 h-10 mx-2 mt-1 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
            >
              <FiUser className="text-xl" />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/myimages">My Images</Link>
              </li>
              <li onClick={() => HandleLogout()} className="  font-bold ">
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <Link
          to="/signup"
          className="ml-auto border md:text-[19px] text-[12px] border-green-900 rounded-lg m-2 px-3 py-2 cursor-pointer hover:bg-green-900 hover:text-white"
        >
          Signup
        </Link>
      )}
    </div>
  );
}

export default Navbar;
