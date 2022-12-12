const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const router = require("../routes/student");
const mongoose = require("mongoose");
const port = 8080

//app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/USERDBMS",()=>{
    console.log("connect to the server");
})
// your code goes here
app.use("/api/",router);

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   