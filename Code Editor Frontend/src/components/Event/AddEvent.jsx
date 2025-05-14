import React from "react";
import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => navigate("/create")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Create Event
      </button>
    </div>
  );
}

export default AddEvent;
