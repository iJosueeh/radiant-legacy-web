import { useState } from "react";
import { LoadingContext } from './LoadingContext';

export const LoadingProvider = ({ children }) => {
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoadingOverlay, setIsLoadingOverlay }}>
      {children}
    </LoadingContext.Provider>
  );
};
