const express = require("express");
const db = require("./utils/db-connection");
const studentsRouter = require("./routes/studentRoutes");
const app = express();

const StudentModels = require("./models/students");

app.use(express.json());

app.use("/students",studentsRouter)

db.sync({force:true}).then(()=>{
    app.listen(3000,()=>{
        console.log("Server is running...")
    })
}).catch((err)=>{
    console.log(err);
})