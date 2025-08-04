import React, { useMemo } from "react";
import {
  ClimbingBoxLoader,
  PacmanLoader,
  DotLoader,
  GridLoader,
} from "react-spinners";

const Spinner = () => {
  const loaders = useMemo(
    () => [
      <GridLoader key="grid-loader" color="#7AD0C0" />,
      <PacmanLoader key="pacman-loader" color="#89BBC2" />,
      <ClimbingBoxLoader key="climbing-box-loader" color="#97A6C3" />,
      <DotLoader key="dot-loader" color="#A691C5" />,
    ],
    []
  );

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-custom-gradient bg-opacity-50 backdrop-blur-xl z-50 p-4">
      {/* Spinner Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {loaders}
      </div>

      {/* Message */}
      <p className="text-white text-sm md:text-base font-semibold tracking-wide animate-pulse">
        ⚡ Thanks you for being patient — Running on free server tier
      </p>
    </div>
  );
};

export default Spinner;
