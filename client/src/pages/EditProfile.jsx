import React, { useState, useRef,useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormContext } from "../FormContext";


const EditProfile = () => {
      const { user } = useFormContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    city: "",
    country: "",
    picture: null,
  });
  const [previewUrl, setPreviewUrl] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-21%20153219-m6V7uuoLqZdbYYD4oQVAHVZK9CzGOV.png"
  );

  useEffect(() => {
    // Pre-fill form with user data
    if (user) {
      setFormData({
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
        address1: user.address?.split(",")[0] || "",
        city: user.address?.split(",")[1] || "",
        country: user.address?.split(",")[2] || "",
        picture: null,
      });
      setPreviewUrl(user.photoURL || previewUrl);
    } else {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/get-details", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          address1: data.address?.split(",")[0] || "",
          city: data.address?.split(",")[1] || "",
          country: data.address?.split(",")[2] || "",
          picture: null,
        });
        setPreviewUrl(data.imageUrl || previewUrl);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "picture") {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, picture: file });
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("address", `${formData.address1}, ${formData.city}, ${formData.country}`);
      formDataToSend.append("imageUrl", formData.picture);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);

      const res = await fetch("http://localhost:3000/user/update-details", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
        navigate("/profile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile");
      console.error("Error:", error);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileClick=()=>{
    navigate("/profile")
  }
  
  return (
    <div className="w-screen min-h-screen bg-[#31353F] md:p-10">
      <ToastContainer />
      <div className="flex justify-between w-full md:px-10 mt-10">
        {/* Header */}
        <h1 className="text-white text-2xl lg:text-4xl font-semibold">Profile</h1>
        {/* Search and Notifications */}
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
      <div className="mt-28 flex justify-center items-center w-full px-0 md:px-10">
        <div className="container bg-[#1B2028] shadow-lg rounded-lg">
          {/* Profile Picture */}
          <div className="h-32 overflow-hidden bg-slate-100 rounded-t-lg"></div>
          <div className="flex justify-center -mt-12">
            <div className="relative w-32 h-32">
              <img
                className="h-32 w-32 bg-white rounded-full object-cover"
                src={previewUrl}
                alt="profile"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                onClick={handleProfilePictureClick}
              >
                <FaCamera className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto">
            <input
              type="file"
              id="picture"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            {/* Inputs */}
            {["firstName", "lastName", "phone", "email", "address1", "city", "country"].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-gray-400 text-sm font-bold mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none"
                  id={field}
                  type="text"
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            {/* Buttons */}
            <div className="flex justify-between">
              <button type="button" onClick={handleProfileClick} className="bg-gray-500 px-4 py-2 rounded">
                Cancel
              </button>
              <button type="submit" className="bg-emerald-500 px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
