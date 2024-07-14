import React, { useMemo } from "react";
import { ClimbingBoxLoader, PacmanLoader, DotLoader, HashLoader, GridLoader } from "react-spinners";

const Spinner = () => {
  // Memoize loader components
  const loaders = useMemo(() => [
    <GridLoader key="grid-loader" color="#7AD0C0" />,
    <PacmanLoader key="pacman-loader" color="#89BBC2" />,
    <ClimbingBoxLoader key="climbing-box-loader" color="#97A6C3" />,
    <DotLoader key="dot-loader" color="#A691C5" />,
    <HashLoader key="hash-loader" color="#B47CC6" />
  ], []);

  return (
    <div className="fixed inset-0 grid place-items-center grid-cols-5 gap-1 bg-black bg-opacity-50 backdrop-blur-xl z-50 p-1">
      {loaders}
    </div>
  );
};

export default Spinner;
