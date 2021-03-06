const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const postsRoute = require('./routes/postRoute');


const app=express();
dotenv.config();
app.use(cors());

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("database connected successfully")).catch((err)=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

//ROUTES
app.use('/posts',postsRoute);


//Listing to server
app.listen(process.env.PORT,()=>{
    console.log(`APP IS LISTING AT PORT: ${process.env.PORT}`);
});
