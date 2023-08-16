import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logoutUser());
      await navigate("/login");
      toast.success("User Logged Out!");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-full py-2 px-10 z-10 border-b-2 ">
        <div className="flex items-center justify-between ">
          <a
            className="cursor-pointer hover:font-extrabold"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </a>
          {/* Log out model */}
          <div>
            <button
              className="text-black border-2 border-gray-400 py-2 px-4 rounded-xl hover:bg-red-400 hover:text-white hover:border-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Typography>Logout</Typography>
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="py-4">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <Typography color="gray" className="mb-5 text-2xl py-2.5">
                    Are you sure you want to logout?
                  </Typography>
                  <div className="flex justify-end">
                    <Button
                      ripple={true}
                      className="bg-blue-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="red"
                      ripple={true}
                      onClick={handleLogoutConfirm}
                      className="ml-2"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Header;
