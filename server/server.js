const express = require("express");
const app = express();

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

// import route
const user = require("./routes/User");

// mount route
app.use("/api/v1",user);

// app.get("/", (req, res) => {
//     return res.json({
//         success:true,
//         message:'Your server is up and running....'
//     });
// });

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})

module.exports = app