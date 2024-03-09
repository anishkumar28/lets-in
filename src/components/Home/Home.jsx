import React from "react";
import HomeImage from "../../assets/loopcv-animation.gif"
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


export default function Home(){
    return(
        <div className="flex flex-nowrap flex-col">
            <Navbar />
            <div className=" mt-8">
            <div className="flex flex-wrap mt-4 mr-8 ml-8 justify-evenly">
                <div className="flex flex-col flex-nowrap justify-between" >
                  <div>
                      <h1 className="mt-4 font-bold italic text-6xl" style={{fontFamily: "Medium"}}>Organize Your</h1>
                      <h1 className="mt-4 font-bold italic text-6xl" style={{fontFamily: "Medium"}}>Job Search</h1>
                    </div>
                    <button  className="rounded-md bg-green-600 mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            <Link
                            to='dashboard'
                            >
                            To Dashboard
                            </Link>
                    </button>
                    
                    </div>
                <div className="p-4 justify-center">
                    <img className="rounded h-64 w-70"src={HomeImage} alt="home-img" />
                </div>
            </div>
            </div>
        </div>
    )
}