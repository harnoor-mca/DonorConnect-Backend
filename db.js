<<<<<<< HEAD

// const mysql=require("mysql2");
// const db=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"harnoor",
//     database:"donorconnect"
// });
// db.connect((err)=>{
//     if(err){
//         console.log("DB error:",err);
//     } else{
//         console.log("MySQL connected!");
//     }
// });

=======
>>>>>>> 72e9fc46a1705d3a51d8bddef1b55c3bfce07e34
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
        console.log("MySQL connected!");
    }
});
<<<<<<< HEAD

=======
>>>>>>> 72e9fc46a1705d3a51d8bddef1b55c3bfce07e34
module.exports=db;