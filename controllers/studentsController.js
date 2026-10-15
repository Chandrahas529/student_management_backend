const db = require("../utils/db-connection");

const addEntry = (req,res) => {
    const {name,email,age} = req.body;
    const insertQuery = `INSERT INTO students (name,email,age) VALUES(?,?,?)`;
    db.execute(insertQuery,[name,email,age],(err)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
        }
        console.log("New student added");
        res.status(201).send("Added successfully!");
    })
}

const getEntry = (req,res) => {
    const getQuery = `select * from students`;
    db.execute(getQuery,(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return;
        }
        console.log("Fetching all the data.");
        res.status(200).json(result);
    })
}

const getEntryById = (req,res) => {
    const id = req.params.id;
    const getQuery = `select * from students where id=?`;
    db.execute(getQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
        }
        if(result.fieldCount === 0){
            res.status(404).send("User not found");
        }
        console.log(`User with id ${id} is fetched`);
        res.status(200).json(result);
    })
}

const updateEntry = (req,res) => {
    const id = req.params.id;
    const {name,email,age} = req.body;
    const getQuery = `update students set name=?, email=?, age=? where id=?`;
    db.execute(getQuery,[name,email,age,id],(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
        }
        if(result.affectedRows === 0){
            res.status(404).send("User not found");
            return;
        }
        console.log("User updated");
        res.status(200).send("User updated successfully!");
    })
}

const deleteEntry = (req,res) => {
    const id = req.params.id;
    const getQuery = `delete from students where id=?`;
    db.execute(getQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
        }
        if(result.affectedRows === 0){
            res.status(404).send("User not found");
            return;
        }
        console.log("User is deleted");
        res.status(200).send("User is deleted successfully!");
    })
}

module.exports = {
    addEntry,
    getEntry,
    getEntryById,
    updateEntry,
    deleteEntry
}