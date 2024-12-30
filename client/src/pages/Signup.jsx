import React from "react";
import { FaInfinity } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider,  } from '../firebaseConfig'; // Adjust the import path as necessary
import { signInWithPopup } from "firebase/auth";
import axios from 'axios';
import { useFormContext } from "../FormContext";

const Signup = () => {
  const navigate = useNavigate();
  const { user,setUser } = useFormContext();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   updateFormField(name, value); // Update specific field in formData
  // };

  // const handleSignup = () => {
  //   console.log("Submitting signup data:", formData);
  //   // Add your API call or form submission logic here
  // };

  const handleClick = () => {
    navigate("/login");
  };

  const handleClickSignupTwo = () => {
    navigate("/signup-2");
  };


  const handleSocialLogin = async (provider) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        console.log(result)

        // Prepare user data for MongoDB
        const userData = {
            email: user.email,
            displayName: user.displayName || "No Name",
            firebaseUID: user.uid,
            photoURL:user.photoURL,
            createdAt: new Date(),
        };
        console.log(userData)

        // Check if the user already exists in MongoDB
        const res = await axios.post('http://localhost:3000/user/check', { firebaseUID: user.uid });

        if (res.data.exists) {
            // User already exists, log them in
            console.log("User already exists in the database.");
            // Optionally, fetch additional details if needed before navigating
        } else {
            // If not, create a new user record in MongoDB
            await axios.post('http://localhost:3000/user/signup', userData);
            console.log("User created and stored in the database.");
        }

        // Redirect to homepage after successful signup/login
        setUser(userData); // Update context with user data
        navigate("/homepage");
    } catch (error) {
        console.error("Error during social login:", error);
        alert("An error occurred during login. Please try again.");
    }
};


  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen bg-[#31353F] text-white">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 h-full bg-[#1B2028] p-8 lg:p-16 hidden lg:flex flex-col justify-center items-center ">
          <div className="mb-8 flex items-center gap-3 ">
            <FaInfinity className="h-8 w-8 text-emerald-400" />
            <h2 className="text-2xl font-bold font-manrope ">Logoipsm</h2>
          </div>
          <h1 className="text-xl font-bold mb-6 font-manrope mt-10">
            Sign up Now
          </h1>
          <p className="font-manrop mt-10">Lorem ipsum</p>
        </div>

        {/* Right side - Illustration */}
        <div className="flex items-center justify-center w-full lg:w-1/2 h-full text-center mx-a">
          <div>
            <div className="mb-8 flex items-center gap-3 text-center ">
              <FaInfinity className="h-8 w-8 text-emerald-400" />
              <h1 className="text-2xl font-bold font-manrope">Logoipsm</h1>
            </div>
            <div className="mb-10">
              <h1 className="text-white text-3xl font-semibold font-manrope">
                Create an account Today
              </h1>
            </div>
            <div>
              <div className="text-left flex gap-3 mb-8 cursor-pointer" onClick={() => handleSocialLogin(facebookProvider)}>
                <img
                  className="h-5 w-5 rounded-full object-cover"
                  src="https://static.vecteezy.com/system/resources/previews/012/660/856/non_2x/facebook-logo-on-transparent-isolated-background-free-vector.jpg"
                  alt=""
                />
                <p className="text-white text-sm font-manrope">Continue with Facebook</p>
              </div>
              <div className="text-left flex gap-3 mb-8 cursor-pointer" onClick={() => handleSocialLogin(appleProvider)}>
                <img
                  className="h-5 w-5 rounded-full object-cover"
                  src="/src/assets/apple.jpg"
                  alt=""
                />
                <p className="text-white text-sm font-manrope">Continue with Apple</p>
              </div>
              <div className="text-left flex gap-3 cursor-pointer" onClick={() => handleSocialLogin(googleProvider)}>
                <img
                  className="h-5 w-5 rounded-full object-cover"
                  src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
                  alt=""
                />
                <p className="text-white text-sm font-manrope">Continue with Google</p>
              </div>
            </div>
            <div className="text-center w-full bg-[#06D6A0] py-2 rounded-lg mt-10 hover:bg-emerald-500 ">
              <button
                onClick={handleClickSignupTwo}
                className="w-full font-manrope hover:text-white transition-all duration-200"
              >
                Sign up with phone or email
              </button>
            </div>
            <div className="mt-52">
              <p className="text-[#848484] text-sm font-manrope">Already have an account?</p>
              <div className="text-center w-full bg-[#202020] hover:bg-[#101010] py-2 rounded-xl mt-3">
                <button onClick={handleClick} className="w-full font-manrope">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
