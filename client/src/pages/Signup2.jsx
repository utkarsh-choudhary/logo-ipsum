import React, { useState } from "react";
import { FaInfinity } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup2 = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const validateInput = () => {
    const { email } = formData;

    // Regular expression for 10-digit phone number
    const phoneRegex = /^\d{10}$/;
    // Regular expression for email ending with @gmail.com
    const emailRegex = /^[\w-\.]+@gmail\.com$/;

    // Check if email is a valid phone number or a valid Gmail address
    if (!phoneRegex.test(email) && !emailRegex.test(email)) {
      toast.error("Please enter a 10 digit phone or an email");
    }

    // Clear the error message if validation is successful
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields.");
        return;
    }

    const res = await fetch("http://localhost:3000/user/signup", {
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            displayName: formData.displayName || "", // Ensure displayName is included if needed
            firebaseUID: "someFirebaseUID", // Replace with actual Firebase UID if available
        }),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });

    if (res.ok) {
        toast.success("User Created Successfully");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    } else {
        const errorResponse = await res.json();
        toast.error(errorResponse.message || 'Signup failed');
    }
};


  return (
    <div>
        <ToastContainer/>
      <div className="flex flex-col lg:flex-row h-screen bg-[#31353F] text-white">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 h-full bg-[#1B2028] p-8 lg:p-16  hidden lg:flex flex-col justify-center items-center ">
          <div className="mb-8 flex items-center gap-3 ">
            <FaInfinity className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold font-manrope">Logoipsm</h1>
          </div>
          <h2 className="text-xl font-bold mb-6  mt-10 font-manrope">Sign up Now</h2>
          <p className="mt-10">Lorem ipsum</p>
        </div>

        {/* Right side - Illustration */}

        <div className=" flex items-center justify-center w-full lg:w-1/2 h-full text-center mx-a">
          <div>
            <div className="mb-8 flex items-center justify-center gap-3 text-center ">
              <h1 className="text-4xl font-bold font-manrope">Create Personal Account</h1>
            </div>
            <div>
              <form className="space-y-4" onSubmit={ handleSubmit} >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-1 uppercase text-gray-300 text-left font-manrope"
                  >
                    Email or Phone Number
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                  
                    id="email"
                    className="w-full p-3 rounded-lg bg-[#31353F] border border-gray-700 focus:border-emerald-400 focus:outline-none"
                    placeholder="alex@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm uppercase text-gray-300 mb-1 text-left font-manrope"
                  >
                    Password
                  </label>
                  <input
                    
                    onChange={handleChange}
                    type="password"
                    id="password"
                    className="w-full p-3 rounded-lg bg-[#31353F] border border-gray-700 focus:border-emerald-400 focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="">
                  <input type="checkbox" required className="bg-[#31353F]" />{" "}
                  <label htmlFor="" className=" text-gray-300 font-manrope ">
                    By continuing you accept our Privacy Policy
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-center text-white hover:bg-emerald-500 w-full bg-[#06D6A0] py-2 rounded-lg mt-10 font-manrope"
                >
                  Create Personal Account
                </button>
              </form>
            </div>
            <div className=" mt-52">
              <p className=" text-[#848484] text-sm font-manrope">
                Already have an account?
              </p>
              <div className=" text-center w-full bg-[#202020] py-2 rounded-xl hover:bg-[#101010] mt-3">
                <Link className="w-full font-manrope hover:bg-[#101010]" to={"/login"}>
                  {" "}
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup2;
