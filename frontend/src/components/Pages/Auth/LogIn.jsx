import React, { useState } from "react";
import Google from "../../../assets/google.svg";
import WomanImage from "../../../assets/woman.png";
import { Link, useNavigate } from "react-router-dom";
import usePasswordToggle from "../../FormComponents/usePasswordToggle";
import { app } from "../../Database/Firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";

const auth = getAuth(app);

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const loginUser = () => {
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Please enter both email and password.",
        severity: "warning",
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Logged in successfully!",
          severity: "success",
        });
        setTimeout(() => navigate("/"), 2500);
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: "Login failed. Please try again.",
          severity: "error",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Login Card */}
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-[850px] max-w-full">
        {/* Left side - Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-1/2">
          <h2 className="mb-3 text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="font-light text-gray-500 mb-6">
            Please login to continue your journey 🚀
          </p>

          <div className="py-2">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="py-2">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={PasswordInputType}
                required
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none placeholder:text-gray-400"
                placeholder="Enter your password"
              />
              <span className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-indigo-500">
                {ToggleIcon}
              </span>
            </div>
          </div>

          <div className="flex justify-between w-full py-3 text-sm text-gray-600">
            <div>
              <span className="cursor-pointer hover:text-indigo-600">
                Forgot password?
              </span>
            </div>
          </div>

          <button
            className="w-full bg-indigo-600 text-white p-2.5 rounded-lg mb-5 font-semibold hover:bg-indigo-700 transition"
            onClick={loginUser}
          >
            Log In
          </button>

          {/* <button className="w-full border border-gray-300 text-sm p-2.5 rounded-lg mb-5 hover:bg-gray-100 flex items-center justify-center">
            <img src={Google} alt="Google" className="w-5 h-5 inline mr-2" />
            Continue with Google
          </button> */}

          <div className="text-center text-gray-500 text-sm">
            Don’t have an account?
            <Link to="/signup">
              <span className="font-semibold text-indigo-600 ml-1 hover:underline">
                Sign up
              </span>
            </Link>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-indigo-500 to-blue-400 items-center justify-center rounded-r-2xl relative">
          <img
            src={WomanImage}
            alt="Illustration"
            className="object-cover h-full w-full opacity-90 rounded-r-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-r-2xl"></div>
          <h3 className="absolute bottom-8 left-8 text-white text-xl font-semibold drop-shadow-lg">
            Simplify your login experience ✨
          </h3>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
