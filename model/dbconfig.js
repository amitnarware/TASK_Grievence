let mysql = require('mysql')
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "grievance_system" 
});
connection.connect(function(err){
    if(err){
        console.log("Not Connected",err.sqlMessage)}
   else{
    console.log("connected")
   }
})  

module.exports = {connection}; 