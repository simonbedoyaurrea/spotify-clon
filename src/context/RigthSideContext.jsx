import React, { createContext, useContext, useState } from 'react';

const RigthSideContext = createContext();


export const RigthSideProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    return (
      <RigthSideContext.Provider value={{ isOpen, setIsOpen}}>
        {children}
      </RigthSideContext.Provider>
    );
  };
  
  export const useRigthSideContext = () => {
    return useContext(RigthSideContext);
  };