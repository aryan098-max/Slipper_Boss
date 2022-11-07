import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user) navigate("/home");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = login
      ? "http://localhost:5000/auth/login"
      : "http://localhost:5000/auth/create-user";

    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: pass,
      }),
    });
    const data = await res.json();
    if (data.message === "user exists!" || data.message === "user created!") {
      setUser(data.data._id);
      navigate("/home");
    }
    if (data.message.includes("{username}")) setEmailErr(true);
    if (data.message.includes("{password}")) setPassErr(true);
    if (data.message.includes("please login!")) {
      setLogin(true);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden selection:bg-white">
      <div className="w-1/2 bg-gray-500 pt-20 px-10">
        <h1 className="text-5xl italic font-bold">Slipper Boss</h1>
        <p className="p-4 text-xl font-semibold text-gray-50">
          Discover the world's top fashionable shoes!
        </p>
      </div>
      <div className="w-3/4 p-4 flex flex-col items-end">
        <p className="items-end">
          {!login ? "Already a member?" : "Don't have an account?"}
          <span
            onClick={() => {
              setEmailErr(false);
              setPassErr(false);
              setEmail("");
              setPass("");
              setLogin((prev) => !prev);
            }}
            className="text-black-600 font-bold hover:cursor-pointer pl-1"
          >
            {login ? "Sign Up" : "Sign In"}
          </span>
        </p>
        <div className="w-full pt-10 items-center h-full flex flex-col">
          <p className="text-xl font-bold">
            {login ? "Sign in to SlipperBoss" : "Sign up to SlipperBoss"}
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            {!login && (
              <div className="flex">
                <div className="flex flex-col m-5">
                  <label className="font-semibold p-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="input-box"
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="flex flex-col m-5">
                  <label className="font-semibold p-1" htmlFor="lastname">
                    Lastname(Optional)
                  </label>
                  <input
                    className="input-box"
                    type="text"
                    name="lastname"
                    id="lastname"
                  />
                </div>
              </div>
            )}
            <div className={`${login ? "flex" : ""}`}>
              <div className="flex flex-col mb-5 ml-5">
                <label
                  className={`font-semibold p-1 ${
                    emailErr ? "text-red-500" : ""
                  }`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="input-box w-[240px]"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div
                className={
                  login ? "flex flex-col m-5 mt-0" : "flex flex-col m-5"
                }
              >
                <label
                  className={`font-semibold p-1 ${
                    passErr ? "text-red-500" : ""
                  }`}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="input-box w-[240px]"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                />
              </div>
            </div>
            <input
              type="submit"
              value={!login ? "Sign Up" : "Sign In"}
              className="input-box bg-green-300 ml-5 w-[93%] hover:cursor-pointer hover:bg-green-400 mt-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
/***
 *
 *
 * Not adding validations.
 */
