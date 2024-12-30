'use client';

import React, { useState } from 'react';
import { FiPenTool } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, name: 'Data Type' },
  { id: 2, name: 'Data Source' },
  { id: 3, name: 'Destination Storage/ Upload' },
  { id: 4, name: 'Settings' },
  { id: 5, name: 'Schema' },
  { id: 6, name: 'Review' }
];

function DatasetCreator() {
  const [currentStep, setCurrentStep] = useState(6); // Currently on the Review step
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/homepage/submitml6')
  }
  const handleBack=()=>{
    navigate("/homepage/submit-ml-5/:id")
  }

  return (
    <div className="min-h-screen bg-[#31353F]">
      <div className="container mx-auto px-4 py-10 lg:flex lg:gap-8">
        {/* Main content */}
        <div className="lg:w-3/4 p-8">
          <h1 className="text-white text-4xl mb-6">Create a datasset</h1>

          <div className="bg-[#1B2028] border border-gray-800 rounded-lg p-6">
            <h2 className="text-white text-2xl mb-8">Review</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Data Type Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white">Data Type</h3>
                  <FiPenTool className="text-emerald-400 w-4 h-4" />
                </div>
                <div className="border border-emerald-600/30 rounded-lg p-4">
                  <div className="grid grid-cols-3 text-emerald-400 text-sm mb-2">
                    <span>Name</span>
                    <span>Description</span>
                    <span>Type</span>
                  </div>
                  <div className="grid grid-cols-3 text-white">
                    <span>iris7777</span>
                    <span>-</span>
                    <span>5.1</span>
                  </div>
                </div>
              </section>

              {/* Data Source Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white">Data Source</h3>
                  <FiPenTool className="text-emerald-400 w-4 h-4" />
                </div>
                <div className="border border-emerald-600/30 rounded-lg p-4">
                  <div className="text-emerald-400 text-sm mb-2">Type</div>
                  <div className="flex justify-between text-white">
                    <span>Local</span>
                    <span>-</span>
                  </div>
                </div>
              </section>

              {/* File Selection Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white">File Selection</h3>
                  <FiPenTool className="text-emerald-400 w-4 h-4" />
                </div>
                <div className="border border-emerald-600/30 rounded-lg p-4">
                  <div className="text-emerald-400 text-sm mb-2">Upload Path</div>
                  <div className="text-white text-sm break-all">
                    azureml://subscriptions/a71210a3-89de-4981-a2d4-257cdf439271
                  </div>
                </div>
              </section>

              {/* Storage Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white">Storage</h3>
                  <FiPenTool className="text-emerald-400 w-4 h-4" />
                </div>
                <div className="border border-emerald-600/30 rounded-lg p-4">
                  <div className="text-emerald-400 text-sm mb-2">DataStore Type</div>
                  <div className="flex justify-between text-white">
                    <span>Azure Blob</span>
                    <span>-</span>
                  </div>
                </div>
              </section>

              {/* Schema Section */}
              <section className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-white">Schema</h3>
                  <FiPenTool className="text-emerald-400 w-4 h-4" />
                </div>
                <div className="border border-emerald-600/30 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-emerald-400 text-sm mb-2">Sepal.length</div>
                      <div className="text-white">Decimal</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 text-sm mb-2">Sepal.Width</div>
                      <div className="text-white">Decimal</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={handleBack} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleClick} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md">
                Finish
              </button>
            </div>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="lg:w-1/6 lg:fixed lg:top-0 lg:right-0 h-screen">
          <div className="bg-gray-900 h-full p-6 text-center relative overflow-hidden">
            {/* Background Image */}
            <img
              className="absolute inset-0 object-cover w-full h-full brightness-50"
              src="/src/assets/temp/image.png"
              alt="Background pattern"
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
                          ? 'text-emerald-500'
                          : 'text-gray-700'
                      } flex items-center justify-center mr-3`}
                    >
                      <FaRegUserCircle className="text-4xl font-thin" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-lg ${
                          step.id <= currentStep ? 'text-emerald-500' : 'text-white'
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
                <p className="text-sm text-gray-400">6 to 6 step</p>
                <p className="text-lg font-semibold text-white">100% complete</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
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

export default DatasetCreator;
