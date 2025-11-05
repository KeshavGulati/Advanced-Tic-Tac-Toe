import React, { createContext, useContext, useState, ReactNode } from "react";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UserChoiceType = {
  iconChoice: string,
  setIconChoice: (icon: string) => void,
  getUserIcon: () => any,
  getCPUIcon: () => any,

}

const UserChoiceContext = createContext<UserChoiceType | undefined>(undefined);

export const UserIconProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [iconChoice, setIconChoice] = useState("o-mark");

    const getUserIcon = () => {
      if (iconChoice == "x-mark") {
        return <FontAwesomeIcon icon={faXmark} className="x-mark" />
    
      }  else {
        return <FontAwesomeIcon icon={faO} className="o-mark" />
    
      }
      
    }

    const getCPUIcon = () => {
      if (iconChoice == "o-mark") {
        return <FontAwesomeIcon icon={faXmark} className="x-mark" />
    
      }  else {
        return <FontAwesomeIcon icon={faO} className="o-mark" />
    
      }

    }

    return (
	<UserChoiceContext.Provider value={{ iconChoice, setIconChoice, getUserIcon, getCPUIcon }}>
	    {children}
	</UserChoiceContext.Provider>

    );

};

export const useUserIcon = () => {
    const context = useContext(UserChoiceContext);
    if (!context) throw new Error("useUserGame must be used within a UserGame context provider");
    return context;

}
