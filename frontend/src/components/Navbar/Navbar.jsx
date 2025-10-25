import Logo from "../../assets/logo_black.png"
import MyLogo from "../../assets/mylogo.png"
import LetsInLogo from "../../assets/letsinlogo.png"
import LetsLogo from "../../assets/letslogo.png"
import { NavLink } from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {app} from "../Firebase";

const auth = getAuth(app);


function Navbar(){
    return(
        <nav>
        <div className=" flex flex-nowrap justify-between mt-2 m-8 p-4 border-b-2 border-black">
        <div>
            <button className="">
                <img className= "h-12"src={LetsInLogo} alt=""/>
            </button>
        </div>
        <div className="flex flex-nowrap shrink p-4 gap-1">
            <button>
            <NavLink
                    to="/dashboard"
                    className={() => `pl-2 pr-2 pt-2 pb-2 hover:bg-black hover:text-white hover:rounded `}>
                        Dashboard
                    </NavLink>
                    
            </button>
            <button className="pl-2 pr-2 pt-2 pb-2 hover:bg-black hover:text-white hover:rounded ">
            <NavLink
                to="/about">
                About
                </NavLink>
            </button>
            <button className="pl-2 pr-2 pt-2 pb-2 hover:bg-black hover:text-white hover:rounded "
            onClick={() => signOut(auth)}>Logout</button>
        </div>
        </div>
    </nav>
    )
}

export default Navbar;