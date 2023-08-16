import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar/Sidebar";
import Header from "../components/common/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginSuccess } from "../features/Auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithNav = () => {
  const loginSuccess = useSelector((state) => state.auth.loginSuccess);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Login successful!"); // Show success toast after navigating
      dispatch(clearLoginSuccess());
    }
  }, []);

  const sidebarClass = sidebarOpen ? "w-[300px]" : "hidden";
  return (
    <>
      <div className="flex h-[100vh]">
        <div
          className={`${sidebarClass} h-[100vh] overflow-x-hidden transition-all duration-300`}
        >
          <Sidebar />
        </div>
        <div className="flex flex-col w-full h-[100vh]">
          <Header toggleSidebar={toggleSidebar} />
          <div className="bg-[#F4F6F9] h-full items-center flex flex-col">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default WithNav;
