import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useFormContext } from "../FormContext";

const steps = [
  { id: 1, name: "Training Method" },
  { id: 2, name: "Basic Settings" },
  { id: 3, name: "Task type & Data" },
  { id: 4, name: "Task Settings" },
  { id: 5, name: "Compute" },
  { id: 6, name: "Review" },
];

export default function SubmitML4() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentStep, setCurrentStep] = useState(4);
  const [allData, setAllData] = useState([]);
  const { id } = useParams();
  const { formData, setFormData } = useFormContext();

  console.log(formData);

  useEffect(() => {
    const getAllData = async () => {
      const res = await fetch(`http://localhost:3000/jobs/data-all/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const allRes = await res.json();
      console.log(allRes);
      if (allRes.success === true) {
        setAllData(allRes.allData); // Assuming the array is under the "data" key
      } else {
        setAllData([]); // Handle cases where it’s not an array
      }
    };
    getAllData();
  }, []);

  const handleSelectData = (selectedId) => {
    setSelectedOption(selectedId);
    setFormData((prevFormData) => ({ ...prevFormData, dataSetId: selectedId }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/jobs/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        // Redirect to the next step or any other page after submission
        console.log("Job is created successfully");
      } else {
        console.error("Submission failed:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#31353F] text-white pl-10 font-manrope">
      <div className=" w-full h-full pt-10 ">
        <h1 className="text-4xl font-bold mb-8 mt-5 ">
          Submit an Automated ML job
        </h1>

        <div className="flex flex-col lg:flex-row justify-between h-full mt-20 gap-8">
          {/* Main content */}
          <div className="lg:w-2/3 bg-[#1B2028] rounded-xl p-6 mr-6 lg:mr-0 ">
            <h2 className="text-3xl font-semibold mb-4 px-10 mt-7  ">
              Choose a file or folder
            </h2>

            <div className="px-10 w-full lg:w-3/5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Datastore Type*
              </label>
              <select
                id="countries"
                onChange={(e) =>
                  setFormData({ ...formData, dataSetType: e.target.value })
                }
                name="dataSetType"
                className="bg-white text-black text-base block w-full p-2.5 pr-3 rounded-lg"
                required
              >
                <option defaultChecked className="text-gray-400">
                  Select an option
                </option>
                <option value="Azure Blob Storage">Azure Blob Storage</option>
                <option value="Google Cloud Storage">
                  Google Cloud Storage
                </option>
                <option value="Amazon Simple Storage Service (S3)">
                  Amazon Simple Storage Service
                </option>
              </select>
            </div>
            <div className=" flex w-full gap-4 justify-between items-center px-10 mt-8 ">
              <h1 className=" text-lg font-semibold ">Select Data Set</h1>
              <div className=" flex gap-1 items-center ">
                <CiSearch className=" text-lg " />
                <button className=" text-white rounded-lg px-4 py-1">
                  Search
                </button>
              </div>
            </div>

            <div className=" px-10">
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="text-left text-[#06D6A0] space">
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Name
                      </th>
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Data Type
                      </th>
                      <th className="py-2 pr-4 font-normal text-[#06D6A0] text-left">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((job, index) => (
                      <tr key={index} className="border-b border-gray-500">
                        <td className="py-6 pr-4">
                          <input
                            type="radio"
                            value={job._id}
                            checked={selectedOption === job._id}
                            onChange={() => handleSelectData(job._id)}
                            className="mr-2 accent-[#06D6A0]"
                          />
                          {job.name}
                        </td>
                        <td className="py-3 pr-4">{job.dataType}</td>
                        <td className="py-3 pr-4">{job.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className=" px-10 flex gap-4 mt-12 ">
              <Link to={`/homepage/submit-ml-3/${id}`}>
                <div className=" bg-[#858585] px-8 py-2 rounded-lg ">
                  Cancel
                </div>
              </Link>
              <Link
                to={`/homepage/submit-ml-5/${id}`}
                className="px-4 py-2 bg-[#06D6A0] text-white rounded-md hover:bg-[#05c090]"
              >
                Next
              </Link>
            </div>
          </div>

          {/* Stepper */}
          <div className="lg:w-1/4 lg:absolute lg:right-0 lg:top-0 h-full mr-6 lg:mr-0 ">
            <div className="bg-gray-900 rounded-lg p-6 h-full text-center relative overflow-y-hidden">
              <img
                className=" absolute object-cover h-full brightness-50  "
                src="/src/assets/temp/image.png"
                alt=""
              />
              <div className="flex flex-col justify-center pl-8 pt-8 ">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-start mb-4">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        step.id <= currentStep
                          ? "text-emerald-500"
                          : "bggray-700"
                      } flex items-center justify-center mr-3`}
                    >
                      <FaRegUserCircle className=" text-4xl font-thin " />
                    </div>
                    <div className="flex flex-col mt-1  ">
                      <span
                        className={`text-lg ${
                          step.id <= currentStep
                            ? "text-emerald-500"
                            : "text-white"
                        }`}
                      >
                        {step.name}
                      </span>
                      {index < steps.length - 1 && (
                        <div className="h-10 w-0.5 bg-gray-700 ml-4 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-400">4 to 6 step</p>
                <p className="text-lg font-semibold">
                  {Math.round((currentStep / steps.length) * 100)}% to complete
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
