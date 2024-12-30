import React, { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

const defaultFormData = {
  training: "",
  jobName: "",
  experimentName: "",
  description: "",
  tags: "",
  taskType: "",
  dataSetType: "",
  dataSetId: "",
};

export const FormProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem("formData");
      return savedData ? JSON.parse(savedData) : defaultFormData;
    } catch (error) {
      console.error("Failed to parse form data from localStorage:", error);
      return defaultFormData;
    }
  });

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Clear localStorage when user logs out
    }
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("formData", JSON.stringify(formData));
    }, 300); // Debounce updates
    return () => clearTimeout(timeout);
  }, [formData]);

  const clearFormData = () => {
    setFormData(defaultFormData);
    localStorage.removeItem("formData");
  };

  const updateFormField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ user, setUser, formData, setFormData, clearFormData, updateFormField }}>
      {children}
    </FormContext.Provider>
  );
};
