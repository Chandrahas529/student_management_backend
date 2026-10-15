const Student = require("../models/students");
const db = require("../utils/db-connection");

const addEntry = async (req,res) => {
    try{
        const {name,email,age} = req.body;
        const student = await Student.create({
            name,
            email,
            age
        })
        console.log("New student added");
        res.status(201).send("Added successfully!");
    }
    catch(err){
         res.status(500).send(err.message);
    }
    // const insertQuery = `INSERT INTO students (name,email,age) VALUES(?,?,?)`;
    // db.execute(insertQuery,[name,email,age],(err)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return ;
    //     }
    //     console.log("New student added");
    //     res.status(201).send("Added successfully!");
    // })
}

const getEntry = async (req,res) => {
    try{
        const student = await Student.findAll();
        console.log("Fetching all the data.")
        res.status(200).json(student);
    }
    catch(err){
        res.status(500).send("Failed to update user");
    }
    // const getQuery = `select * from students`;
    // db.execute(getQuery,(err,result)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return;
    //     }
    //     console.log("Fetching all the data.");
    //     res.status(200).json(result);
    // })
}

const getEntryById = async (req,res) => {
    try{
        const id = req.params.id;
        const student = await Student.findByPk(id);
        if(!student){
            res.status(404).send("User not found");
        }
        console.log(`Fetching user data with id ${id}`);
        res.status(200).json(student);
    }
    catch(err){
        res.status(500).send("Failed to update user");
    }
    // const id = req.params.id;
    // const getQuery = `select * from students where id=?`;
    // db.execute(getQuery,[id],(err,result)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return ;
    //     }
    //     if(result.fieldCount === 0){
    //         res.status(404).send("User not found");
    //     }
    //     console.log(`User with id ${id} is fetched`);
    //     res.status(200).json(result);
    // })
}

const updateEntry = async (req,res) => {
    try{
        const id = req.params.id;
        const {name,email,age} = req.body;
        const student = await Student.findByPk(id);
        if(!student){
            res.status(404).send("User not found");
        }
        if(name)
            student.name = name;
        if(email)
            student.email = email;
        if(age)
            student.age = age;
        await student.save();
        console.log(`Updating user with id ${id}`);
        res.status(200).send("User has been updated")
    }
    catch(err){
        res.status(500).send("Failed to update user");
    }
    // const getQuery = `update students set name=?, email=?, age=? where id=?`;
    // db.execute(getQuery,[name,email,age,id],(err,result)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return ;
    //     }
    //     if(result.affectedRows === 0){
    //         res.status(404).send("User not found");
    //         return;
    //     }
    //     console.log("User updated");
    //     res.status(200).send("User updated successfully!");
    // })
}

const deleteEntry = async (req,res) => {
    try{
        const id = req.params.id;
        const student = await Student.destroy({
            where:{
                id:id
            }
        });
        if(!student){
            res.status(404).send("User not found");
        }
        console.log(`Deleting user with id ${id}`);
        res.status(200).send("User is deleted")
    }
    catch(err){
        res.status(500).send("Failed to delete user");
    }
    // const id = req.params.id;
    // const getQuery = `delete from students where id=?`;
    // db.execute(getQuery,[id],(err,result)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return ;
    //     }
    //     if(result.affectedRows === 0){
    //         res.status(404).send("User not found");
    //         return;
    //     }
    //     console.log("User is deleted");
    //     res.status(200).send("User is deleted successfully!");
    // })
}

module.exports = {
    addEntry,
    getEntry,
    getEntryById,
    updateEntry,
    deleteEntry
}