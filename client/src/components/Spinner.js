import React from "react";
import { ClimbingBoxLoader, PacmanLoader, DotLoader, HashLoader, GridLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="fixed inset-0 grid place-items-center grid-cols-5 gap-1 bg-black bg-opacity-50 backdrop-blur-xl z-50 p-1">
      <GridLoader color="#7AD0C0" />
      <PacmanLoader color="#89BBC2" />
      <ClimbingBoxLoader color="#97A6C3" />
      <DotLoader color="#A691C5" />
      <HashLoader color="#B47CC6" />
      
    </div>
  );
};

export default Spinner;
