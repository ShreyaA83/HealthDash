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
    <div className="fixed inset-0 grid place-items-center bg-custom-gradient bg-opacity-50 backdrop-blur-xl z-50 p-1">
      <div className="grid grid-cols-4 gap-1 items-center">
        {loaders}

        {/* Message below, spans full width */}
        <p className="col-span-4 text-white text-sm md:text-base font-semibold tracking-wide text-center mt-4 typewriter">
          ⚡ Thank you for being patient — Running on free server tier
        </p>
      </div>
    </div>
  );
};

export default Spinner;
