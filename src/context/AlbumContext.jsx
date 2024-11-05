import React, { createContext, useContext, useState } from 'react';

const AlbumContext = createContext();


export const AlbumProvider = ({ children }) => {
    const [value, setValue] = useState();
  
    return (
      <AlbumContext.Provider value={{ value, setValue }}>
        {children}
      </AlbumContext.Provider>
    );
  };
  
  export const useAlbumContext = () => {
    return useContext(AlbumContext);
  };