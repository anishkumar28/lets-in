const express = require("express");
const app = express();

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());



app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})

const dbConnect = require("./config/database");
dbConnect();

module.exports = app