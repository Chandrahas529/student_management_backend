const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("studentmangement","root","admin1234",{
    host:"localhost",
    dialect:"mysql"
});

(async()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection to the database has been created.");
    }
    catch(err){
        console.log(err);
    }
})();

module.exports = sequelize;







// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"admin1234",
//     database: "studentmangement"
// })

// connection.connect((err)=>{
//     if(err){
//         console.log(err);
//         return ;
//     }
//     console.log("Connection has been created.")
// })

// module.exports = connection;