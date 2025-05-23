import React from "react";
import OutputWindow from "./OutputWindow";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-900">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-900">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;