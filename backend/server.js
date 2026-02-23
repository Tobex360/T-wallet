const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authUroutes = require('./routes/authUroutes');
const cors = require('cors');
const path = require('path');


require('dotenv').config();


const PORT = process.env.PORT  || 5000;
const DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());

app.use('/user',authUroutes);

mongoose.connect(DB_URL).then((result)=>{
    console.log('Connected to mongodb');
}).catch(err=>{
    console.log(err);
})

app.listen(PORT,()=>{
    console.log(`The server started at ${PORT}`)
});