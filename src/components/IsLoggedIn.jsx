import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./Firebase"
import LogIn from "./Pages/LogIn";
import Home from "./Pages/Home";

const auth = getAuth(app);

function IsLoggedIn(){

    const[user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }

        })
    })

    return (user === null) ? <LogIn/> : <Home/>;
        
    

   
}

export default IsLoggedIn;