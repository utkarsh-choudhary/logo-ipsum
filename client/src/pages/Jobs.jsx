
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const jobsData = {
  allExperiments: [
    {
      latestJob: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      lastSubmitted: "Jan 6, 2023",
      jobCreated: "40 min 15 sec",
      jobType: "Automated",
    },
  ],
  allJobs: [
    {
      latestJob: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      lastSubmitted: "Dec 5, 2023",
      jobCreated: "45 min 20 sec",
      jobType: "Automated",
    },
    {
      latestJob: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      lastSubmitted: "Dec 5, 2023",
      jobCreated: "45 min 20 sec",
      jobType: "Automated",
    },
    {
      latestJob: "olive_nut_rb0dgls7vw",
      experiment: "Default",
      lastSubmitted: "Dec 5, 2023",
      jobCreated: "45 min 20 sec",
      jobType: "Automated",
    },
  ],
  allSchedules: [
    {
      name: "ZT1-07867",
      type: "BTC",
      duration: "36h",
      performance: "+0.25%",
      imageSrc: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "ZT1-07867",
      type: "ITC",
      duration: "48h",
      performance: "+0.25%",
      imageSrc:
        "https://s3.coinmarketcap.com/static/img/portraits/630c5fcaf8184351dc5c6ee5.png",
    },
    {
      name: "ZT1-07867",
      type: "ETH",
      duration: "12h",
      performance: "+0.25%",
      imageSrc:
        "https://e7.pngegg.com/pngimages/779/56/png-clipart-ethereum-cryptocurrency-erc20-blockchain-dogecoin-wallet-blue-bitcoin.png",
    },
    {
      name: "ZT1-07867",
      type: "ITC",
      duration: "1h",
      performance: "+0.25%",
      imageSrc:
        "https://s3.coinmarketcap.com/static/img/portraits/630c5fcaf8184351dc5c6ee5.png",
    },
    {
      name: "ZT1-07867",
      type: "SOL",
      duration: "8h",
      performance: "-0.25%",
      imageSrc:
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/solana-sol-7152167-5795323.png",
    },
    {
      name: "ZT1-07867",
      type: "BTC",
      duration: "72h",
      performance: "+0.25%",
      imageSrc: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "ZT1-07867",
      type: "BTC",
      duration: "24h",
      performance: "+0.25%",
      imageSrc: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "ZT1-07867",
      type: "ITC",
      duration: "8h",
      performance: "+0.25%",
      imageSrc:
        "https://s3.coinmarketcap.com/static/img/portraits/630c5fcaf8184351dc5c6ee5.png",
    },
  ],
};

export default function Jobs() {
  const [activeTab, setActiveTab] = useState("allExperiments");
  const [formData,setFormData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(()=>{
    const AllJobs = async()=>{
        const res = await fetch('http://localhost:3000/jobs/user-all-jobs',{
          method: "GET",
          credentials : 'include',
          headers:{
            "Authorization": `Bearer ${token}`, // Add token here
            "Content-Type": "application/json"
          }
        })

        if(res.ok){
          const data = await res.json();
          setFormData(data.jobs);
        }
        else{
          console.log("backend issue");
          
        }

    }
    AllJobs()
  },[])

  console.log(formData);
  

  return (
    <div className="min-h-screen w-full bg-[#31353F] px-4 sm:px-6 lg:px-10 overflow-x-hidden font-manrope">
      <div className="pt-10 sm:pt-20 text-white mt-10 p-10 ">
        <h1 className="text-2xl sm:text-3xl font-semibold">Jobs</h1>
        <p className="mt-3 text-sm">
          Let Automated ML train and find the best model based on your data
          without writing a single line of code
        </p>
      </div>

      <div className="mt w-full ">
        <div className=" px-10 w-full">
          <div className="text-white w-full">
            {/* Tabs */}
            <div className="flex space-x-4 sm:space-x-8 mt-4 border-b-2 border-gray-600 overflow-x-auto pb-2">
              {["allExperiments", "allJobs", "allSchedules"].map((tab) => (
                <button
                  key={tab}
                  className={`whitespace-nowrap ${
                    activeTab === tab ? "text-[#06D6A0]" : "text-gray-400"
                  } hover:text-[#06D6A0] transition-colors`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab.charAt(0).toUpperCase() +
                    tab.slice(1).replace(/([A-Z])/g, " $1")}
                </button>
              ))}
            </div>

            {/* Conditional Rendering based on activeTab */}
            <div className="mt-5 w-full  ">
              <div className=" mb-8">
                <h1 className=" text-4xl font-semibold text-white">
                  Best Performing Models
                </h1>
              </div>
              {activeTab === "allSchedules" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {jobsData.allSchedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="bg-[#1B2028] rounded-lg p-4 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className=" p-3 bg-[#31353F] rounded-lg ">
                          <img
                            className=" w-5 h-5"
                            src={schedule.imageSrc}
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {schedule.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {schedule.type}
                          </p>
                        </div>
                        <span>
                          {schedule.performance.startsWith("+") ? (
                            <FaCaretUp className=" text-lg text-green-500 " />
                          ) : (
                            <FaCaretDown className=" text-lg text-red-500" />
                          )}
                        </span>
                      </div>
                      <div className=" flex justify-between items-center" >
                        <div className="text-xl font-semibold mb-2">
                          {schedule.duration}
                        </div>
                        <div>
                            <img className=" w-full h-9" src="/src/assets/image2.png" alt="" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto bg-[#1B2028] rounded-2xl px-8 pb-8 ">
                  <table className="w-full text-white">
                    <thead className="">
                      <tr>
                        <th className="py-10 text-left font-normal text-[#06D6A0]">
                          Latest Jobs
                        </th>
                        <th className="py-3 px-4 text-left font-normal text-[#06D6A0]">
                          Experiment
                        </th>
                        <th className="py-3 px-4 text-left font-normal text-[#06D6A0]">
                          Last Submitted
                        </th>
                        <th className="py-3 px-4 text-left font-normal text-[#06D6A0]">
                          Job Created
                        </th>
                        <th className="py-3 text-right font-normal text-[#06D6A0]">
                          Job Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobsData[activeTab].map((job, index) => (
                        <tr key={index} className="border-b border-gray-700 ">
                          <td className="py-5 ">{job.latestJob}</td>
                          <td className="py-3 px-4">{job.experiment}</td>
                          <td className="py-3 px-4">{job.lastSubmitted}</td>
                          <td className="py-3 px-4">{job.jobCreated}</td>
                          <td className="py-3 text-right ">{job.jobType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
