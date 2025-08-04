import React, { useMemo } from "react";
import { ClimbingBoxLoader, PacmanLoader, DotLoader, GridLoader } from "react-spinners";

const Spinner = () => {
  // Memoize loader components
  const loaders = useMemo(() => [
    <GridLoader key="grid-loader" color="#7AD0C0" />,
    <PacmanLoader key="pacman-loader" color="#89BBC2" />,
    <ClimbingBoxLoader key="climbing-box-loader" color="#97A6C3" />,
    <DotLoader key="dot-loader" color="#A691C5" />,
  ], []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-custom-gradient bg-opacity-50 backdrop-blur-xl z-50 p-4 space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {loaders}
      </div>
      <p className="text-white text-sm font-medium animate-pulse">
        Please be patient - Free server
      </p>
    </div>
  );
};

export default Spinner;
