require("dotenv").config();
const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"harnoor",
    database:"donorconnect"
});
db.connect((err)=>{
    if(err){
        console.log("DB error:",err);
    } else{
        console.log("Connected to Railway db!");
    }
});
module.exports=db;
