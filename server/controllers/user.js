const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signup = async(req, res) => {
    try {

        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already Exists. Please Login',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
               success:false,
               message: 'Error in password', 
            });
        }

        // create entry for User
        const user = await User.create({
            name,email,password:hashedPassword
        });

        return res.status(200).json({
            success:true,
            message:'User created successfully'
        });


    } catch (error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: 'User cannot registered. Please try again',
        });
    }
}



// login route handler
exports.login = async(req,res) => {
    try{
        //get data
        const {email,password} = req.body;

        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: 'Please fill all the details successfully'
            });
        }

        // check for registered user with email
        let user = await User.findOne({email});

        // if registered user with email not found
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User is not registered"
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
        }

        // verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password)){
            // password matched
            let token = jwt.sign(payload,
                                 process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h"
                                } );
           user = user.toObject();
           user.token = token;
           user.password = undefined;
           const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly:true,
           }


           res.cookie("customCookie", token, options).status(200).json({
            success:true,
            token,
            user,
            message:'User Logged In successfully',
           })
        }

        else{
            // password do not match
            return res.status(403).json({
                success:false,
                message: 'Invalid passwword',
            });
        }
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"Login Failure",
        });
    }
}

exports.logout = (req,res) => {
    const loggedInUser = req.cookies.customCookie;

    if(loggedInUser){
        res.clearCookie("customCookie")
        .status(200)
        .json({
            message: "Thanks ! Come Back again"
        });
    }
}