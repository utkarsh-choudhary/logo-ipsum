import React from "react";
import { FiPenTool } from "react-icons/fi";

const Data = () => {
  return (
    <div className="min-h-screen w-full bg-[#31353F]  pl-2 lg:pl-10 overflow-x-hidden">
      <div className="pt-10 sm:pt-20 text-white pl-10">
        <h1 className="text-2xl sm:text-3xl font-semibold font-manrope">
          Automated Machine Learning
        </h1>
        <p className="mt-3 text-sm font-manrope">
          Let Automated ML train and find the best model based on your data
          without writing a single line of code
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-3 md:px-10 w-full h-full ">
        {/* left side */}
        <h2 className="text-white">Attributes</h2>
        <div className="bg-[#1B2028] mt-16 rounded-2xl border border-[#06D6A0] shadow-xl p-4 sm:p-6 lg:py-6 w-full lg:w-1/2 h-[50vh] lg:h-[70vh] mb-10 overflow-y-scroll   ">
        
          <div className="w-full">
            <h1 className=" text-[#06D6A0] mb-2 font-manrope">Type</h1>
            <h1 className=" text-white font-manrope">Table</h1>
          </div>
          <div className="w-full mt-8 ">
            <div>
              <h1 className=" text-[#06D6A0] mb-2 font-manrope">Data Type</h1>
              <h1 className=" text-white font-manrope">Tabular</h1>
            </div>
          </div>
          <div className="w-full mt-8 ">
            <div>
              <h1 className=" text-[#06D6A0] mb-2 font-manrope">Created by</h1>
              <h1 className=" text-white font-manrope">David Ritchie</h1>
            </div>
          </div>
          <div className="w-full mt-8 font-manrope">
            <div>
              <h1 className=" text-[#06D6A0] mb-2 font-manrope">Profile</h1>
              <h1 className=" text-white font-manrope">View Profile</h1>
            </div>
          </div>
          <div className="w-full mt-8 ">
            <div>
              <h1 className=" text-[#06D6A0] mb-2 font-manrope">File in Dataset</h1>
              <h1 className=" text-white font-manrope">1</h1>
            </div>
          </div>
          <div className="w-full mt-8 ">
            <div>
              <h1 className=" text-[#06D6A0] mb-2 font-manrope">Total Size in Dataset</h1>
              <h1 className=" text-white font-manrope">100 kb</h1>
            </div>
          </div>
          <div className="w-full mt-8 font-manrope">
            <div>
              <h1 className=" text-[#06D6A0] mb-2 ">Latest Version</h1>
              <h1 className=" text-white ">1</h1>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className=" flex flex-col gap-6 w-full lg:w-2/5  ">
          <div className=" bg-[#1B2028] rounded-2xl mt-16 border border-[#06D6A0] p-4 sm:p-6 lg:p-10  w-full ">
            <div className="w-full px-1 flex justify-between items-center font-manrope">
              <h1 className=" text-[#06D6A0] ">Tags</h1>
              <FiPenTool className=" text-[#06D6A0] text-sm " />
            </div>
            <h1 className=" text-white px-1 mt-3 font-manrope">No Data</h1>
          </div>
          <div className=" bg-[#1B2028] rounded-2xl border border-[#06D6A0] p-4 sm:p-6 lg:p-10  w-full ">
            <div className="w-full px-1 flex justify-between items-center ">
              <h1 className=" text-[#06D6A0] font-manrope">Description</h1>
              <FiPenTool className=" text-[#06D6A0] text-sm " />
            </div>
            <h1 className=" text-white px-1 mt-3 font-manrope">Click to edit description</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
