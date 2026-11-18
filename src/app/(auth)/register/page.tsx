import React from "react";
import RegistrationForm from "./../component/registration-form";

const RegistrationPage = () => {
  return (
    <div className="text-center mx-auto py-10 space-y-5">
      <h1 className=" text-4xl">Join Rental Lagbe Today</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
