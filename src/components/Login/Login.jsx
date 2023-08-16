import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  authenticateUser,
  setLoginSuccess,
} from "../../features/Auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // const loginSuccess = useSelector((state) => state.auth.loginSuccess);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      setIsLoading(false);
      return;
    }
    try {
      await dispatch(authenticateUser({ username, password }));
      setIsLoading(false);
      dispatch(setLoginSuccess());
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Authentication failed:", error);
      toast.error("Authentication failed. Incorrect username/password.");
    }
    // setIsLoading(false);
  };
  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 xl">
          <div className="bg-white rounded-lg shadow w-96">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login
              </h1>
              <form className="space-y-4 " onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 "
                    // required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-left mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    // required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isLoading ? (
                    <TailSpin height={24} width={1000} color="#ffffff" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
