import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormContext } from "../FormContext";

const steps = [
  { id: 1, name: "Training Method" },
  { id: 2, name: "Data Store" },
  { id: 3, name: "Destination Storate type & Data" },
  { id: 4, name: "File or Folder Selection" },
  { id: 5, name: "Schema" },
  { id: 6, name: "Review" },
];

export default function SubmitML() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const {id} = useParams();
  const {formData,setFormData} = useFormContext()

  const navigate = useNavigate();

  const handleStartConfiguration = () => {
    if (selectedOption) {
      setCurrentStep(2);
    }
  };

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
  }
  console.log(formData);


  const handleSubmit = (e) =>{
    e.preventDefault()
    navigate(`/homepage/submit-ml-2/${id}`)
  }
  

  return (
    <div className="min-h-screen bg-[#31353F] text-white pl-10 font-manrope">
      <div className=" w-full h-full pt-10 ">
        <h1 className="text-3xl font-bold mb-8 mt-5 ">
          Submit an Automated ML job
        </h1>

        <div className="flex flex-col lg:flex-row justify-between mt-20  gap-8">
          {/* Main content */}
          <div className="lg:w-2/3 bg-[#1B2028] rounded-xl p-6 mr-6 lg:mr-0">
            <h2 className="text-2xl font-semibold mb-4">How do you want to train your model?</h2>
            <p className="text-gray-400 mb-6">Choose the method of training you would like to use.</p>

            <form className="space-y-4 mt-20 px-10" onSubmit={handleSubmit}>
              <div
                className={`border-2 ${
                  formData.training === "automatic" ? "border-emerald-500" : "border-gray-600"
                } rounded-lg p-4 cursor-pointer`}
              >
                <label className="flex items-center gap-8">
                  <input
                    type="radio"
                    name="training"
                    value="automatic"
                    checked={formData.training === "automatic"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      formData.training === "automatic" ? "border-emerald-500 bg-emerald-500" : "border-gray-400"
                    } mr-4 flex items-center justify-center`}
                  >
                    {formData.training === "automatic" && <span className="text-black text-xs">✓</span>}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Train Automatically</h3>
                    <p className="text-gray-400 text-sm">
                      Submit an Automated ML job to train a model without writing a single line of code.
                    </p>
                  </div>
                </label>
              </div>

              <div
                className={`border-2 ${
                  formData.training === "custom" ? "border-emerald-500" : "border-gray-600"
                } rounded-lg p-4 cursor-pointer`}
              >
                <label className="flex items-center gap-8">
                  <input
                    type="radio"
                    name="training"
                    value="custom"
                    checked={formData.training === "custom"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      formData.training === "custom" ? "border-emerald-500 bg-emerald-500" : "border-gray-400"
                    } mr-4 flex items-center justify-center`}
                  >
                    {formData.training === "custom" && <span className="text-black text-xs">✓</span>}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Train Custom</h3>
                    <p className="text-gray-400 text-sm">Submit a command to train your own code.</p>
                  </div>
                </label>
              </div>
              <div className="mt-10 flex justify-start space-x-4">
                <button type="button" onClick={() => navigate('/homepage')} className="px-4 py-2 mt-8 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 mt-8 rounded-md transition-colors ${
                    formData.training
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!formData.training}
                >
                  Start Configuration
                </button>
              </div>
            </form>
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
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg> */}
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
                <p className="text-sm text-gray-400">1 to 6 step</p>
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
