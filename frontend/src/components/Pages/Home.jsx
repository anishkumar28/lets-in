import React from "react";
import BeachImage from "../../assets/Beach.jpg"
import { Link } from "react-router-dom";
import Navbar from "../FormComponents/Navbar/Navbar";


export default function Home(){
    return(
        <div className="flex flex-nowrap flex-col">
            <Navbar />
            <div className=" mt-8">
            <div className="flex flex-wrap mt-4 mr-8 ml-8 mb-4 justify-evenly">
                <div className="flex flex-col flex-nowrap justify-around" >
                  <div>
                      <h1 className="mt-4 font-bold italic text-6xl" style={{fontFamily: "Medium"}}>Organize Your</h1>
                      <h1 className="mt-4 font-bold italic text-6xl" style={{fontFamily: "Medium"}}>Job Search</h1>
                    </div>
                    <button  className="rounded-md bg-green-600 mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            <Link
                            to='/dashboard'
                            >
                            To Dashboard
                            </Link>
                    </button>
                    
                    </div>
                <div className="p-4 justify-center">
                    <img className="w-[400px] h-full rounded "src={BeachImage} alt="home-img" />
                </div>
            </div>
            </div>
        </div>
    )
}