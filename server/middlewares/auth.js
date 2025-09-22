const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{
        // extract jwt token
        const token = req.cookie.token || req.body.token || req.header("Authorization").replace("Bearer", "");

        if(!token || token == undefined){
            return res.status(401).json({
                sucess:false,
                message: "Token is missing",
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } catch(error){
            return res.status(401).json({
                sucess:false,
                message: "Token is invalid",
            });
        }

        next();
    } catch(error){
        return res.status(401).json({
            sucess:false,
            message: "Something went wrong, while verifying the token",
        });
    }
}


