const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin1234",
    database: "studentmangement"
})

connection.connect((err)=>{
    if(err){
        console.log(err);
        return ;
    }
    console.log("Connection has been created.")
})

module.exports = connection;