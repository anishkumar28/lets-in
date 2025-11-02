import React, { useState } from "react";
import Google from "../../../assets/google.svg";
import BusinessLadyImage from "../../../assets/business-lady.png";
import { Link } from "react-router-dom";
import usePasswordToggle from "../../FormComponents/usePasswordToggle";
import { app } from "../../Database/Firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";

const auth = getAuth(app);

function SignUp() {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const createUser = () => {
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields.",
        severity: "warning",
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Account created successfully!",
          severity: "success",
        });
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.message || "Signup failed. Please try again.",
          severity: "error",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Snackbar Toast Notification */}
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

      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-[90%] max-w-4xl">
        {/* Left Section */}
        <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-1/2">
          <span className="mb-3 text-4xl font-bold text-gray-800">Sign Up</span>
          <span className="font-light text-gray-400 mb-6 text-sm">
            Create your account to get started
          </span>

          {/* Name */}
          <div className="py-2">
            <span className="mb-1 text-sm font-medium text-gray-700">Name</span>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              name="name"
              id="name"
            />
          </div>

          {/* Email */}
          <div className="py-2">
            <span className="mb-1 text-sm font-medium text-gray-700">Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              name="email"
              id="email"
            />
          </div>

          {/* Password */}
          <div className="py-2">
            <span className="mb-1 text-sm font-medium text-gray-700">Password</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={PasswordInputType}
              required
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              name="password"
              id="password"
            />
            <div className="flex justify-between w-full py-2">
              <div className="text-sm text-gray-600 cursor-pointer flex items-center gap-1">
                {ToggleIcon} Show Password
              </div>
              <span className="text-sm font-semibold text-gray-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            className="w-full bg-indigo-600 text-white p-2.5 rounded-lg mb-5 font-semibold hover:bg-indigo-700 transition"
            onClick={createUser}
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center text-gray-500 text-sm mt-6">
            Already have an account?
            <Link to="/login">
              <span className="font-semibold text-black hover:underline ml-1">Log In</span>
            </Link>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="relative hidden md:flex md:w-1/2 bg-gradient-to-tr from-indigo-500 to-blue-400 items-center justify-center rounded-r-2xl">
          <img
            src={BusinessLadyImage}
            alt="SignUp Illustration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
