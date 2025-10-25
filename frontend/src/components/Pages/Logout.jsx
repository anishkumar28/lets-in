import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../Firebase";
import preLoadGif from '../../assets/prelets.gif';
import { PropagateLoader } from "react-spinners";

const auth = getAuth(app);

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error("Logout failed:", error);
        setLoading(false);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl p-10 items-center text-center">
        {loading ? (
          <>
            <img
              src={preLoadGif}
              alt="Logging out"
              className="w-40 h-40 mb-6 animate-pulse"
            />
            <PropagateLoader size={12} color={"#000"} loading={true} />
            <span className="text-gray-600 mt-6 text-lg font-semibold">
              Logging you out...
            </span>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-3">You have been logged out</h1>
            <p className="text-gray-500 mb-6">Thank you for using our app!</p>
            <Link
              to="/login"
              className="bg-black text-white p-2 px-6 rounded-lg hover:bg-white hover:text-black border border-gray-300 transition-all duration-300"
            >
              Log in again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Logout;
