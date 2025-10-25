import React from "react";
import Google from "../../assets/google.svg"
import WomanImage from "../../assets/woman.png"
import { Link } from "react-router-dom";
import usePasswordToggle from "../usePasswordToggle";
import {app} from "../Firebase"
import {signInWithEmailAndPassword, getAuth, onAuthStateChanged} from "firebase/auth"
import { useState, useEffect } from "react";

const auth = getAuth(app);

function LogIn(){
  const loginUser = () => {
    signInWithEmailAndPassword(
      auth, 
      email, 
      password).then((value) => console.log("Logged In successfully"))
      .catch((error) => {
        alert(error),
        console.log()
      });
  }
  

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
        >
          {/* <!-- left side --> */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Log In</span>
            <span className="font-light text-gray-400 mb-8">
              Welcom back! Please enter your details
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type={PasswordInputType}
                required
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
              <span className="password-toggle-icon cursor-pointer">{ToggleIcon} Show Password</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              onClick={loginUser}
            >
              Log in
            </button>
            <button
              className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
            >
              <img src={Google} alt="img" class="w-6 h-6 inline mr-2" />
              Log in with Google
            </button>
            <div className="text-center text-gray-400">
              Dont'have an account?
              <Link to="/signup">
                <span className="font-bold text-black ml-1">Sign up</span>
              </Link> 
            </div>
          </div>

          {/* right side */} 
          <div class="relative">
            <img
              src={WomanImage}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    )
}

export default LogIn;