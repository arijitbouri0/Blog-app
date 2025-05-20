import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/api";
import { userNotExist } from "../redux/reducers/auth";
import type { RootState } from "../redux/store";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userNotExist());
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 w-full h-[64px] bg-blue-500 flex justify-between items-center px-6 text-white z-10">
      <div className="text-lg font-bold">Blogger</div>

      <div className="space-x-2 md:space-x-4 items-center">
        <NavLink className="hover:text-gray-200" to="/">
          Home
        </NavLink>
        <NavLink className="hover:text-gray-200" to="/blogs">
          Blogs
        </NavLink>
      </div>

      <div>
        {user ? (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <NavLink
            className="hover:text-gray-200 w-full h-full bg-purple-500 rounded-sm p-2"
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
