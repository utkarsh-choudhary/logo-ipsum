import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentStep, setCurrentStep] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [workspace, setWorkspace] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allWorkspace = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3000/workspace/all-workspace", {
        method: "GET",
        credentials: "include",
        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();

      // Check if data is an array
      if (Array.isArray(data)) {
        setWorkspace(data);
      } else {
        console.error("Unexpected response format:", data);
        setWorkspace([]); // Reset workspace to an empty array
      }
    };
    allWorkspace();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleStartConfiguration = () => {
    if (selectedOption) {
      setCurrentStep(4);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/workspace/create", {
      body: JSON.stringify(formData),
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
    });

    if (!res.ok) {
      console.error("Failed to submit form:", res.status);
      return;
    }

    const data = await res.json();
    console.log("Response from server:", data); // Log the server response

    toast.success("Workspace created");

    // Fetch updated workspaces
    const allWorkspace = async () => {
      const res = await fetch("http://localhost:3000/workspace/all-workspace", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setWorkspace(data); // Update the workspace data
    };

    allWorkspace(); // Call the function to fetch updated workspaces

    setTimeout(() => {
      setIsModalOpen(false); // Close the modal
      setFormData({}); // Clear form data if needed
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#31353F] text-white px-10 relative font-manrope">
      <ToastContainer />
      <div className="w-full h-full pt-10">
        <h1 className="text-4xl font-bold mb-8 mt-5">
          Automated Machine Learning
        </h1>
        <p>
          Let Automated ML train and find the best model based on your data
          without writing a single line of code
        </p>

        <div className="flex flex-col lg:flex-row w-full h-full mt-20 gap-8">
          {/* Main content */}
          <div className="w-full bg-[#1B2028] rounded-xl p-6 mr-6">
            <div className="flex w-full gap-4 justify-between items-center px-10 mt-8">
              <h1>Select Dataset</h1>
              <button
                className="bg-[#06D6A0] text-white rounded-lg px-4 py-1 hover:bg-emerald-500"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="hidden md:inline-block text-lg ">+</span>{" "}
                Create
              </button>
            </div>

            <div className="px-10">
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="text-left text-[#06D6A0] space">
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Name
                      </th>
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Type
                      </th>
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Created
                      </th>
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Modified
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(workspace) &&
                      workspace.map((job, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-500 hover:bg-[#1E272E]"
                          onClick={() => navigate(`/homepage/${job._id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          <td className="py-6 pr-4">{job.name}</td>
                          <td className="py-3 pr-4">{job.subscription}</td>
                          <td className="py-3 pr-4">{job.createdAt}</td>
                          <td className="py-3 pr-4">{job.region}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#1B2028] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Create New Workspace
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#06D6A0] mb-1">
                  Workspace Name*
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={handleChange}
                  className="w-full bg-[#31353F] text-white rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subscription"
                  className="block text-sm font-medium text-[#06D6A0] mb-1"
                >
                  Subscription*
                </label>
                <input
                  type="text"
                  id="subscription"
                  onChange={handleChange}
                  className="w-full bg-[#31353F] text-white rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#06D6A0] mb-1">
                  Resource Group*
                </label>
                <input
                  type="text"
                  id="group"
                  onChange={handleChange}
                  className="w-full bg-[#31353F] text-white rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-[#06D6A0] mb-1"
                >
                  Region*
                </label>
                <input
                  type="text"
                  id="region"
                  onChange={handleChange}
                  className="w-full bg-[#31353F] text-white rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#06D6A0] text-white rounded hover:bg-[#05c090] transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
