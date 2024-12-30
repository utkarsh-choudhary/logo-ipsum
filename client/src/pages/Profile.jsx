import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFormContext } from "../FormContext";

const Profile = () => {
    const { user } = useFormContext();
  const [userDetails, setUserDetails] = useState({
    firstName: "N/A",
    lastName: "N/A",
    address: "N/A",
    phone: "N/A",
    email: "N/A",
    imageUrl: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.displayName?.split(" ")[0] || "N/A",
        lastName: user.displayName?.split(" ")[1] || "N/A",
        email: user.email || "N/A",
        imageUrl: user.photoURL || "",
        address: user.address || "N/A", // Update if address exists
        phone: user.phone || "N/A", // Update if phone exists
      });
    } else {
      // Fetch from backend if not available in context
      fetchUserDetails();
    }
  }, [user]);



  console.log(user);


  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/get-details", {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // Update state based on login type
        if (data.isSocialLogin) {
          setUserDetails({
            firstName: data.firstName || "N/A",
            lastName: data.lastName || "N/A",
            address: data.address || "N/A",
            phone: data.phone || "N/A",
            email: data.email || "N/A",
            imageUrl: data.imageUrl || "", // Social login should have image
          });
        } else {
          setUserDetails({
            firstName: data._doc.firstName || "N/A", // No name for email/password login
            lastName:data._doc.lastName|| "N/A",
            address: data._doc.address || "N/A",
            phone: data._doc.phone || "N/A",
            email: data.email || "N/A", // Only email shown
            imageUrl: data._doc.imageUrl || "", // No image for email/password login
          });
        }
      } else {
        console.error("Failed to fetch user details:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch user details on component mount
  return (
    <div className="w-full min-h-screen bg-[#31353F] p-4 md:p-10 overflow-auto font-manrope">
      <div className="flex justify-between w-full md:px-10 mt-10">
        <div>
          <h1 className="text-white text-2xl lg:text-4xl font-semibold">Profile</h1>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-[#1B2028] items-center py-2 w-36 lg:w-96 px-5 rounded-xl flex justify-between">
            <input
              type="text"
              placeholder="Search...."
              className="text-white focus:ring-0 bg-[#1B2028] w-3/4"
            />
            <CiSearch className="text-white" />
          </div>
          <div className="bg-[#1B2028] py-2 px-4 rounded-lg">
            <IoIosNotificationsOutline className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="mt flex justify-center rounded-lg items-center h- w-full px-0 md:px-10">
        <div className="container mt-28 h-4/5 w-full bg-[#1B2028] shadow-lg rounded-lg transform duration-200 ease-in-out pb-10">
          <div className="h-32 overflow-hidden bg-slate-100 rounded-t-lg"></div>
          <div className="flex justify-center -mt-12">
            <img
              className="h-32 w-32 bg-white rounded-full object-cover"
              src={userDetails.imageUrl || "https://via.placeholder.com/150"} // Default image if none
              alt="profile"
            />
          </div>
          <div className="text-center px-14 mt-8 h-full">
            <form className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <label className="text-left block text-gray-500">First Name</label>
                <input
                  type="text"
                  value={userDetails.firstName}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label className="text-left block text-gray-500">Last Name</label>
                <input
                  type="text"
                  value={userDetails.lastName}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label className="text-left block text-gray-500">Email</label>
                <input
                  type="email"
                  value={userDetails.email}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
              </div>

              {/* Additional fields for address and phone */}
              
              {/* Address field */}
              

              {/* Phone field */}
              <div className="relative z-0 w-full mb-5 group">
                <label className="text-left block text-gray-500">Phone</label>
                <input
                  type="text"
                  value={userDetails.phone}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label className="text-left block text-gray-500">Address</label>
                <input
                  type="text"
                  value={userDetails.address}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  disabled
                />
              </div>

              {/* Link to edit profile */}
              <Link to={'/edit-profile'}>
                <button
                  type="button"
                  className="text-white bg-[#06D6A0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Edit Profile
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
