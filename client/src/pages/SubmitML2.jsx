import React, { useState } from "react";
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

export default function SubmitML2() {
  const [currentStep, setCurrentStep] = useState(2);
  const { formData, setFormData } = useFormContext();
  const { id } = useParams();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
  };
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the form is valid
    if (e.target.checkValidity()) {
      // If the form is valid, navigate to the next page
      navigate(`/homepage/submit-ml-3/${id}`);
    } else {
      // If the form is invalid, trigger the browser's default validation UI
      e.target.reportValidity();
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
              Basic Settings
            </h2>
            <p className="text-gray-400 mb-6 px-10 ">
              Let’s start with some basic settings for training your job
            </p>

            <div className=" flex flex-col justify-center lg:justify-between mb-10 ">
              <form action="" onSubmit={handleSubmit}>
                <div className=" flex lg:flex-row flex-col w-full justify-between px-10 gap-5">
                  <div className="w-full lg:w-1/2 flex flex-col justify-between ">
                    <div className=" flex flex-col gap-2">
                      <label htmlFor="jobName">Job Name*</label>
                      <input
                        type="text"
                        name="jobName"
                        required
                        onChange={handleChange}
                        className=" bg-[#858585] px-2 py-2 "
                      />
                    </div>
                    {/* <h1 className=" mt-10 mb-8"> Experiment Name*</h1>
                    <div className=" flex gap-1 md:gap-5 mb-5 w-full ">
                      <div className=" flex gap-2 items-center">
                        <input type="radio" id="existing" />
                        <label htmlFor="existing">Select Existing</label>
                      </div>
                      <div className=" flex gap-2 items-center">
                        <input type="radio" id="create" />
                        <label htmlFor="create">Create New</label>
                      </div>
                    </div> */}
                     {/* Experiment Name Section */}
                     <h2 className="text-lg font-semibold mt-4">Experiment Name*</h2>
                    <div className="flex gap-4 mb-4">
                      <div>
                        <input
                          type="radio"
                          id="existing"
                          name="experimentOption"
                          value="existing"
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="existing">Select Existing</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="create"
                          name="experimentOption"
                          value="create"
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="create">Create New</label>
                      </div>
                    </div>
                  
                  </div>
                  <div className=" w-full lg:w-1/2 ">
                    <div action="" className=" flex flex-col gap-6">
                      <div className=" flex flex-col gap-2">
                        <label htmlFor="jobName">New Expriment Name*</label>
                        <input
                          type="text"
                          name="experimentName"
                          required
                          onChange={handleChange}
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
                          onChange={handleChange}
                          className=" bg-[#858585] px-2 py-2"
                        />
                      </div>
                      <div className=" flex flex-col gap-2">
                        <label htmlFor="jobName">Tag*</label>
                        <input
                          type="text"
                          name="tags"
                          onChange={handleChange}
                          required
                          id="jobName"
                          className=" text-white bg-[#858585] px-2 py-2 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-10 flex gap-4 mt-12 ">
                  <Link to={"/homepage/submit-ml"}>
                    <div className=" bg-[#858585] px-8 py-2 rounded-lg ">
                      Cancel
                    </div>
                  </Link>
                  <button
                    type="submit"
                    className=" bg-[#06D6A0] px-10 py-2 rounded-lg "
                  >
                    Next
                  </button>
                </div>
              </form>
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
                <p className="text-sm text-gray-400">2 to 6 step</p>
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
