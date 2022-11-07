import React from "react";
import SP from "./svgs/SP";
import { useNavigate } from "react-router";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-tr from-white to-gray-600 relative">
      <header className="w-screen h-28 flex justify-between items-center px-10">
        <img
          className="w-24 h-24 rounded-full"
          src="https://images-workbench.99static.com/7-AGKwH2cz3LG9loVtDYpk1M96c=/99designs-contests-attachments/127/127330/attachment_127330094"
          alt=""
        />
        <div className="flex space-x-8 text-xl font-semibold">
          <p className="cursor-pointer hover:text-gray-200">About</p>
          <p className="cursor-pointer hover:text-gray-200">Catalog</p>
          <p className="cursor-pointer hover:text-gray-200">Contact</p>
          <p className="cursor-pointer hover:text-gray-200">FAQ</p>
        </div>
        <div className="w-20 h-8 bg-gray-500 rounded-md flex justify-around items-center cursor-pointer hover:scale-105">
          <i className="text-white hover:text-gray-400 fa-brands fa-apple"></i>
          <i className="text-white hover:text-gray-400 fa-brands fa-google-play"></i>
        </div>
      </header>

      <main className="w-screen flex items-center h-[400px]">
        <div className="w-3/4 px-40">
          <h1 className="text-5xl font-bold mb-5">
            Each purchase will be made with pleasure
          </h1>
          <p className="font-semibold mb-6">
            We work with globacl brands and created an application for you to do
            your shopping
          </p>
          <button
            onClick={() => {
              navigate("/auth");
            }}
            className="px-6 py-3 text-xl font-semibold bg-gray-400 hover:text-white rounded-md"
          >
            Start Now
          </button>
        </div>
      </main>
      <div className="absolute top-32 right-10">
        <SP />
      </div>
    </div>
  );
};

export default App;
