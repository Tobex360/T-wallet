const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authUroutes = require('./routes/authUroutes');
const authAroutes = require('./routes/authAroutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const path = require('path');


require('dotenv').config();


const PORT = process.env.PORT  || 5000;
const DB_URL = process.env.DB_URL;

//Enable cors
app.use(cors({
    origin:['http://localhost:5173','https://t-wallet.vercel.app'],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}))

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());

//health route for uptime robot

app.get('/api/health',(req, res)=>{
    res.status(200).json({ status: 'ok' })
})



app.use('/user',authUroutes);
app.use('/admin',authAroutes);
app.use('/products',productRoutes);
app.use('/cart',cartRoutes);
app.use('/orders',orderRoutes);


app.listen(PORT,()=>{
    console.log(`The server started at ${PORT}`)
});

mongoose.connect(DB_URL).then((result)=>{
    console.log('Connected to mongodb');
}).catch(err=>{
    console.log(err);
})

