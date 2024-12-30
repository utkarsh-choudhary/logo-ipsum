import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import BarChart from "../Components/BarChart";

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
      name: "pine_seed_xk9fgh2lmp",
      type: "Custom",
      created: "Dec 7, 2023",
      modified: "Dec 8, 2023",
    },
    {
      name: "maple_leaf_yt7ujk3nop",
      type: "Default",
      created: "Dec 9, 2023",
      modified: "Dec 10, 2023",
    },
  ],
};

export default function SubmitML5() {
  const [currentStep, setCurrentStep] = useState(5);
  const [selectedDate, setSelectedDate] = useState("All Dates");

  return (
    <div className="min-h-screen bg-[#31353F] text-white font-manrope">
      <div className="container mx-auto px-4 py-10 lg:flex lg:gap-8">
        {/* Main content */}
        <div className="lg:w-3/4">
          <h1 className="text-4xl font-bold mb-8 mt-5">Compute</h1>

          {/* Date selectors */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              className="bg-[#FFFFFF] text-black px-4 py-2 rounded-md w-full sm:w-auto"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option>All Dates</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <select className="bg-[#FFFFFF] text-black px-4 py-2 rounded-md w-full sm:w-auto">
              <option>All Types</option>
              <option>Default</option>
              <option>Custom</option>
            </select>
          </div>

          {/* Statistics and Chart */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 w-full lg:w-1/3">
              {["Running", "Completed", "Failed", "Queued"].map(
                (title, index) => (
                  <div
                    key={index}
                    className="bg-[#1B2028] p-4 rounded-lg flex flex-col justify-center items-center"
                  >
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-2xl font-bold">{index * 2}</p>
                  </div>
                )
              )}
            </div>
            <div className="w-full lg:w-2/3 h-96 flex items-center justify-center p-4 rounded-lg">
              <BarChart />
            </div>
          </div>

          {/* Task type & Data form */}
          <div className=" rounded-xl p-6">
            {/* <div className="w-full lg:w-3/5 mb-8">
              <form>
                <label htmlFor="taskType" className="block mb-2 text-sm font-medium">
                  Select an option
                </label>
                <select
                  id="taskType"
                  className="bg-[#858585] border border-gray-300 text-white text-sm block w-full p-2.5"
                >
                  <option value="default" selected>Default</option>
                  <option value="custom">Custom</option>
                  <option value="advanced">Advanced</option>
                </select>
              </form>
            </div> */}

            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="text-left text-[#06D6A0]">
                    <th className="py-2 pr-4 font-normal">Experiment</th>
                    <th className="py-2 pr-4 font-normal">Accuracy</th>
                    <th className="py-2 pr-4 font-normal">Loss</th>
                    <th className="py-2 pr-4 font-normal">Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsData.inProgress.map((job, index) => (
                    <tr key={index} className="border-b border-gray-500">
                      <td className="py-3 pr-4">{job.name}</td>
                      <td className="py-3 pr-4">{job.type}</td>
                      <td className="py-3 pr-4">{job.created}</td>
                      <td className="py-3 pr-4">{job.modified}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-4 mt-8">
              <Link
                to="/homepage/submit-ml-4"
                className="bg-[#858585] px-8 py-2 rounded-lg"
              >
                Cancel
              </Link>
              <Link
                to="/homepage/dataset/:id"
                className="bg-[#06D6A0] px-10 py-2 rounded-lg"
              >
                Next
              </Link>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="lg:w-1/6 lg:fixed lg:top-0 lg:right-0 h-screen">
          <div className="bg-gray-900 h-full  p-6 text-center relative overflow-hidden">
            {/* Background Image */}
            <img
              className="absolute inset-0 object-cover w-full h-full brightness-50"
              src="/src/assets/temp/image.png"
              alt=""
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        step.id <= currentStep
                          ? "text-emerald-500"
                          : "text-gray-700"
                      } flex items-center justify-center mr-3`}
                    >
                      <FaRegUserCircle className="text-4xl font-thin" />
                    </div>
                    <div className="flex flex-col items-start">
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

              {/* Progress Bar */}
              <div className="mt-4">
                <p className="text-sm text-gray-400">5 of 6 steps</p>
                <p className="text-lg font-semibold">
                  {Math.round((currentStep / steps.length) * 100)}% complete
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
