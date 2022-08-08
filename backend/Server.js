//importing express
const express = require('express');
const app = express();

// to understand the Server, that data type is json 
app.use(express.json());

//importing cors
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

//importing config
const dotenv = require('dotenv');
dotenv.config({ path: './config/Config.env' });
const PORT = process.env.PORT;

//connection with database
require('./db/Conn');

//imporing cookie-parser
const cp = require('cookie-parser');
app.use(cp());

//adding router
const router = require('./routes/UserRoute');
app.use('/auth', router);

//listening port no 5000
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while making connection");
    }
    console.log(`Server is running on port ${PORT}`);
});