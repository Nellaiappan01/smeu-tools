"use client";
import React, { useState } from "react";
import Loader from "./Loader";

export default function ProcessWrapper({ children, onProcess }) {
  const [status, setStatus] = useState("idle"); // ✅ fixed
  const [errorMessage, setErrorMessage] = useState("");

  const handleAction = async (...args) => {
    setStatus("loading");
    try {
      await onProcess(...args);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000); // auto reset
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {children({ handleAction, status })}

      {status === "loading" && (
        <div className="mt-4 flex flex-col items-center">
          <Loader />
          <p className="text-sm text-gray-600 mt-2">Processing...</p>
        </div>
      )}

      {status === "success" && (
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Done! Ready for next file.
        </p>
      )}

      {status === "error" && (
        <p className="mt-4 text-red-600 font-semibold">❌ {errorMessage}</p>
      )}
    </div>
  );
}
