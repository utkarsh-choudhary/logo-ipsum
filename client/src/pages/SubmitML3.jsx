import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormContext } from "../FormContext";

const steps = [
  { id: 1, name: "Training Method" },
  { id: 2, name: "Basic Settings" },
  { id: 3, name: "Task type & Data" },
  { id: 4, name: "Task Settings" },
  { id: 5, name: "Compute" },
  { id: 6, name: "Review" },
];

const jobsData = {
  inProgress: [
    {
      name: "olive_nut_rb0dgls7vw",
      type: "Default",
      created: "Dec 5, 2023",
      modified: "Dec 6, 2023",
    },
    {
      name: "olive_nut_rb0dgls7vw",
      type: "Default",
      created: "Dec 7, 2023",
      modified: "Dec 8, 2023",
    },
    {
      name: "olive_nut_rb0dgls7vw",
      type: "Default",
      created: "Dec 9, 2023",
      modified: "Dec 10, 2023",
    },
    {
      name: "olive_nut_rb0dgls7vw",
      type: "Default",
      created: "Dec 11, 2023",
      modified: "Dec 12, 2023",
    },
  ],
};

export default function SubmitML3() {
  const { formData, setFormData } = useFormContext();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(3);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [allData, setAllData] = useState([]);

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

  console.log(formData);
  // console.log(allData);


  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      navigate(`/homepage/submit-ml-4/${id}`);
    } else {
      e.target.reportValidity();
    }
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateFormChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(data);

  // const handleCreateFormSubmit = async (e) => {
  //   e.preventDefault();
  //   // Handle the creation of a new dataset here

  //   const res = await fetch(`http://localhost:3000/jobs/data-create/${id}`, {
  //     body: JSON.stringify(data), // Sending the `data` state here
  //     credentials: "include",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json", // Ensure content type is set to JSON
  //     },
  //   });

  //   const resData = await res.json();
  //   if (resData.success == true) {
  //     console.log("successfully");
  //     setShowCreateForm(false);
  //   }
  // };

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/jobs/data-create/${id}`, {
      body: JSON.stringify(data),
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const resData = await res.json();
    if (resData.success === true) {
      // Update the allData state with the newly created data
      setAllData((prevData) => [...prevData, data]);
  
      // Clear form data, hide the form, and reset the input fields
      setData({});
      setShowCreateForm(false);
    }
  };
  

  const handleCreateFormCancel = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-[#31353F] text-white pl-10 font-manrope">
      <div className="w-full h-full pt-10">
        <h1 className="text-4xl font-bold mb-8 mt-5">
          Submit an Automated ML 
        </h1>

        <div className="flex flex-col lg:flex-row justify-between h-full mt-20 gap-8">
          {/* Main content */}
          <div className="lg:w-2/3 bg-[#1B2028] rounded-xl p-6 mr-6 lg:mr-0">
            <h2 className="text-3xl font-semibold mb-4 px-10 mt-7">
              {showCreateForm
                ? "Set the name and type for your data asset"
                : "Task type & Data"}
            </h2>
            {!showCreateForm ? (
              <form className="w-full" onSubmit={handleSubmit}>
                <p className="text-white mb-6 px-10">
                  Choose the type of task that you would like your model to
                  perform and the dataset to use for training.
                </p>

                <div className="px-10 w-full lg:w-3/5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select Task Type*
                  </label>
                  <select
                    id="countries"
                    onChange={handleChange}
                    name="taskType"
                    className="bg-white text-black text-base block w-full p-2.5 pr-3 rounded-lg"
                    required
                  >
                    <option defaultChecked className="text-gray-400">
                      Select an option
                    </option>
                    <option
                      value="temporary"
                      className="hover:bg-blue-500 hover:text-white"
                    >
                      Temporary
                    </option>
                    <option
                      value="permanent"
                      className="hover:bg-blue-500 hover:text-white"
                    >
                      Permanent
                    </option>
                  </select>
                </div>
                <div className="flex w-full gap-4 justify-between items-center px-10 mt-8">
                  <h1>Select Dataset</h1>
                  <button
                    type="button"
                    className="bg-[#06D6A0] text-white rounded-lg px-4 py-1"
                    onClick={handleCreateClick}
                  >
                    <span className="hidden md:inline-block text-lg">+</span>{" "}
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
                        {allData.map((job, index) => (
                          <tr key={index} className="border-b border-gray-500">
                            <td className="py-6 pr-4">{job.name}</td>
                            <td className="py-3 pr-4">{job.dataType}</td>
                            <td className="py-3 pr-4">{job.createdAt}</td>
                            <td className="py-3 pr-4">{job.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="px-10 flex gap-4 mt-12">
                  <Link to={"/homepage/submit-ml-2"}>
                    <div className="bg-[#858585] px-8 py-2 rounded-lg">
                      Cancel
                    </div>
                  </Link>

                  <button
                    type="submit"
                    className="bg-[#06D6A0] px-10 py-2 rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCreateFormSubmit} className="px-10">
                <div action="" className=" flex flex-col gap-6">
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="jobName">Name*</label>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={handleCreateFormChange}
                      className=" bg-[#858585] px-2 py-2"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="jobName">Description*</label>
                    <input
                      type="text"
                      id="description"
                      required
                      name="description"
                      onChange={handleCreateFormChange}
                      className=" bg-[#858585] px-2 py-2"
                    />
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="jobName">Data type*</label>
                    <select
                      id="countries"
                      onChange={handleCreateFormChange}
                      name="dataType"
                      className="bg-white text-black text-base block w-full p-2.5 pr-3 rounded-lg"
                      required
                    >
                      <option defaultChecked className="text-gray-400">
                        Select an option
                      </option>
                      <option
                        value="tabular"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        Tabular
                      </option>
                      <option
                        value="json"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        JSON
                      </option>
                      <option
                        value="graph"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        Graph
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCreateFormCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#06D6A0] text-white rounded-md hover:bg-[#05c090]"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Stepper */}
          <div className="lg:w-1/4 lg:absolute lg:right-0 lg:top-0 min-h-screen h-full mr-6 lg:mr-0">
            <div className="bg-gray-900 rounded-lg p-6 h-full text-center relative overflow-y-hidden">
              <img
                className="absolute object-cover h-full brightness-50"
                src="/src/assets/temp/image.png"
                alt=""
              />
              <div className="flex flex-col justify-center pl-8 pt-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-start mb-4">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        step.id <= currentStep
                          ? "text-emerald-500"
                          : "bggray-700"
                      } flex items-center justify-center mr-3`}
                    >
                      <FaRegUserCircle className="text-4xl font-thin" />
                    </div>
                    <div className="flex flex-col mt-1">
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
                <p className="text-sm text-gray-400">3 to 6 step</p>
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
