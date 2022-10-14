// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// require('dotenv').config()
// const path = require("path")
// const filePath = path.resolve(process.cwd() + "/config/.env") // cwd: stands for current working directory
// require('dotenv').config({
//     path: filePath
// }) // to use that file 
const dotenv = require("dotenv");
const path = require("path");
const filePath = path.resolve(process.cwd+"/config/.env");
dotenv.config({path: filePath})

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


//GET Route I: Server Side
app.get("/getProjectData", (req, res) => {
    console.log(projectData)
    res.send(projectData);
})

//POST Route
app.post("/postProjectData", (req, res) => {
    // projectData = {... req.body}
    projectData = {
        "date": req.body.date,
        "content": req.body.content,
        "temperature": req.body.temperature
    };
    console.log("post data " + JSON.stringify(projectData))
    res.end()
})

app.get("/apiKey", (req, res) => {
    res.send(process.env.APIKey);
})

// Setup Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})
