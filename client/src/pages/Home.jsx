import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FiPenTool } from "react-icons/fi";

const jobsData = {
  inProgress: [
    {
      name: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      created: "Dec 5, 2023",
      duration: "45 min 20 sec",
      status: "Done",
    },
    {
      name: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      created: "Dec 3, 2023",
      duration: "30 min 20 sec",
      status: "Failed",
    },
    {
      name: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      created: "Dec 3, 2023",
      duration: "30 min 20 sec",
      status: "Done",
    },
    {
      name: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      created: "Dec 3, 2023",
      duration: "30 min 20 sec",
      status: "Done",
    },
  ],
  newAssigned: [
    {
      name: "olive_nut_rb0gdtv",
      experiment: "Default",
      created: "Dec 2, 2023",
      duration: "45 min 20 sec",
      status: "Done",
    },
  ],
  completed: [
    {
      name: "olive_nut_rb05fds7vw",
      experiment: "Default",
      created: "Dec 5, 2023",
      duration: "45 min 20 sec",
      status: "Done",
    },
  ],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("inProgress");
  const { id } = useParams();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen w-full bg-[#31353F] overflow-x-hidden font-manrope flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="text-white mb-10 w-full px-4 sm:ml-8">
        <h1 className="text-xl sm:text-3xl font-semibold">
          Automated Machine Learning
        </h1>
        <p className="mt-3 text-sm sm:text-base">
          Let Automated ML train and find the best model based on your data
          without writing a single line of code
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-14 justify-center items-center px-3 md:px-4 w-full">
        {/* ML Jobs Section */}
        <div className="bg-[#1B2028] rounded-2xl p-4 sm:p-6 lg:p-10 w-full lg:w-1/2">
          <div className="w-full">
            <div className="text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-lg sm:text-2xl font-semibold">ML Jobs</h1>
                <Link
                  to={`/homepage/submit-ml/${id}`}
                  className="text-white bg-[#06D6A0] rounded-lg px-3 py-1 text-sm sm:text-base"
                >
                  <span className="text-lg mr-2">+</span>New Job
                </Link>
              </div>
              {/* Tabs */}
              <div className="flex space-x-4 sm:space-x-8 mt-4 border-b-2 border-gray-600 overflow-x-auto pb-2">
                {["inProgress", "newAssigned", "completed"].map((tab) => (
                  <button
                    key={tab}
                    className={`text-sm sm:text-base whitespace-nowrap ${
                      activeTab === tab ? "border-t-2 text-green-500" : ""
                    }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab.charAt(0).toUpperCase() +
                      tab.slice(1).replace(/([A-Z])/g, " $1")}
                  </button>
                ))}
              </div>

              {/* Data Table */}
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="text-left text-[#06D6A0]">
                      <th className="py-2 pr-4 font-normal text-sm sm:text-base">
                        Name
                      </th>
                      <th className="py-2 pr-4 font-normal text-sm sm:text-base">
                        Experiment
                      </th>
                      <th className="py-2 pr-4 font-normal text-sm sm:text-base">
                        Created
                      </th>
                      <th className="py-2 pr-4 font-normal text-sm sm:text-base">
                        Duration
                      </th>
                      <th className="py-2 pr-4 font-normal text-sm sm:text-base">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobsData[activeTab].map((job, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-500 text-xs sm:text-sm"
                      >
                        <td className="py-3 pr-4">{job.name}</td>
                        <td className="py-3 pr-4">{job.experiment}</td>
                        <td className="py-3 pr-4">{job.created}</td>
                        <td className="py-3 pr-4">{job.duration}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-lg text-xs sm:text-sm ${
                              job.status === "Done"
                                ? "bg-white text-[#06D6A0]"
                                : "bg-white text-red-500"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="bg-[#1B2028] rounded-2xl p-4 sm:p-6 lg:p-10 min-h-[200px] w-full lg:w-1/3">
          <div className="w-full px-2 sm:px-5 flex flex-col">
            <div className="text-white w-full flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold">
                Documentation
              </h2>
              <CiHeart className="text-[#06D6A0] text-xl" />
            </div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-full mt-6 flex items-center gap-3 sm:gap-4"
              >
                <div className="bg-white rounded-xl p-2 sm:p-3">
                  <FiPenTool className="text-[#06D6A0] text-lg" />
                </div>
                <div>
                  <h1 className="text-[#E9E9E9] text-sm sm:text-base">
                    Concept: What is Automated ML
                  </h1>
                  <p className="text-[#939393] text-xs sm:text-sm">
                    Website | 02 - 20 Sep 2022
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
