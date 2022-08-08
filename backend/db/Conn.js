const mongoose = require('mongoose');
const DB = process.env.DB_URL;

mongoose.connect(DB)
    .then(()=>{
        console.log("Database is successfully connected!");
    })
    .catch((err)=>{
        console.log(DB);
        console.log("Error while connecting with database");
    });