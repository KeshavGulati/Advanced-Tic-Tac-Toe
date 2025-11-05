import React from "react";
import { SignupForm } from "@/components/signup-form"
import { InputOTPForm } from "@/Components/OTPForm";

const Signup: React.FC = () => {
  const verifyOtp = false;
  
  return (
    <>
    <div className={`${verifyOtp? 'overlay': ''}`}></div>
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
      {
        verifyOtp ?
        <InputOTPForm /> :
        ""
      }
    </div>
    </>

  )

}

export default Signup;