import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Data from "./pages/Data";
import Jobs from "./pages/Jobs";
import SubmitML from "./pages/SubmitML";
import SubmitML2 from "./pages/SubmitML2";
import SubmitML3 from "./pages/SubmitML3";
import SubmitML4 from "./pages/SubmitML4";
import SubmitML5 from "./pages/SubmitML5";
import Signup2 from "./pages/Signup2";
import EditProfile from "./pages/EditProfile";
import HomePage from "./pages/Homepage";
import { useState } from "react";
import { FormProvider } from "./FormContext";
import DatasetCreator from "./pages/DatasetCreator";

function App() {


  return (
    <BrowserRouter>
      <Layout>
        <FormProvider>
          <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/homepage/:id" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/signup-2" element={<Signup2 />} />
            <Route path="/data" element={<Data />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/homepage/submit-ml/:id" element={<SubmitML />} />
            <Route path="/homepage/submit-ml-2/:id" element={<SubmitML2 />} />
            <Route path="/homepage/submit-ml-3/:id" element={<SubmitML3 />} />
            <Route path="/homepage/submit-ml-4/:id" element={<SubmitML4 />} />
            <Route path="/homepage/submit-ml-5/:id" element={<SubmitML5 />} />
            <Route path="/homepage/dataset/:id" element={<DatasetCreator />} />
          </Routes>
        </FormProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
