import React, { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from "react";

type OTPContextType = {
  optContainerVisible: boolean,

}

const OTPContext = createContext<OTPContextType | undefined>(undefined);

export const OTPContextProvider: React.FC<{children: ReactNode}>

const OTPContext = () => {
  return (
    <div>OTPContext</div>

  )
  
}

export default OTPContext