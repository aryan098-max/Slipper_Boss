import React from "react";
import { useNavigate } from "react-router-dom";

const OderDone = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="text-7xl font-bold">Your Order is placed!</h1>

      <p className="mt-2 text-3xl font-semibold">
        Return{" "}
        <span
          onClick={() => {
            navigate("/home");
          }}
          className="text-green-400 cursor-pointer"
        >
          back
        </span>{" "}
        to home to browse new products{" "}
      </p>
    </div>
  );
};

export default OderDone;
