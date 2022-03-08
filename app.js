require('dotenv/config')
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')

//INITIATE EXPRESS
const app = express();

//CONNECT TO DB
mongoose.connect(process.env.MONGO_DB_URL, () =>{
    console.log("Connected to database")
})

//MIDDLEWARES
app.use(cors())
app.use(express.json())


//ROUTES
app.use('/user', userRoutes);


//OPEN PORT
app.listen(8080);