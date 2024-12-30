import React, { useState } from "react";
import { FaInfinity } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock, CiUnlock } from "react-icons/ci";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all the details");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();

      if (data.success === true) {
        toast.success("User signed in successfully");
        setTimeout(() => {
          navigate("/homepage");
        }, 1000);
      } else {
        toast.error("User not found");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <ToastContainer />

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-2/5 p-8 bg-[#1B2028] flex flex-col items-center justify-center h-screen lg:h-auto">
        <div className="mb-8 flex items-center gap-1">
          <FaInfinity className="h-8 w-8 text-emerald-400" />
          <h1 className="text-2xl font-bold text-emerald-400 font-manrope">
            Logoipsm
          </h1>
        </div>
        <h2 className="text-3xl font-semibold text-white mb-6 font-manrope text-center">
          Login into your account
        </h2>
        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 font-manrope"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="font-manrope block w-full px-3 py-2 pr-10 border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-500"
                placeholder="alex@example.com"
                onChange={handleChange}
              />
              <MdOutlineMailOutline className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white bg-emerald-400 p-1 rounded" />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 font-manrope"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="font-manrope block w-full px-3 py-2 pr-10 border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-500"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              {showPassword ? (
                <CiUnlock
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white bg-emerald-400 p-1 rounded cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <CiLock
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white bg-emerald-400 p-1 rounded cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="flex justify-end mt-1">
            <a
              href="#"
              className="text-sm text-blue-800 underline hover:text-blue-900 font-manrope"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-manrope"
          >
            Sign In Now
          </button>
        </form>
        <div className="mt-6 flex items-center w-full max-w-sm">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="px-3 text-gray-400 bg-[#1B2028] font-manrope">
            OR
          </span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <Link to="/">
          <button
            type="button"
            className="font-manrope mt-4 w-full py-2 px-4 border text-emerald-400 border-emerald-400 rounded-md shadow-sm text-sm font-medium bg-transparent hover:bg-emerald-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Sign Up Now
          </button>
        </Link>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex w-3/5 bg-[#31353F] items-center justify-center h-screen">
        <img
          src="/src/assets/image.png"
          alt="Login Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Login;
