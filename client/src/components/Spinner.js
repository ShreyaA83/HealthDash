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
    <div className="fixed inset-0 grid place-items-center grid-cols-4 gap-1 bg-black bg-opacity-50 backdrop-blur-xl z-50 p-1">
      {loaders}
    </div>
  );
};

export default Spinner;
