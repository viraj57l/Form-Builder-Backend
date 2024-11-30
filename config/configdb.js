const mongoose =require('mongoose');
require('dotenv').config();

const URI=process.env.MONGO_URI;

const connectDB= async() =>{
    try{
        const conn= await mongoose.connect(URI,{});
        console.log("MongoDB Connected ");
    }catch(error){
        console.log(`Error : ${error.message}`);
        process.exit(1);   
    }
};

module.exports=connectDB;
