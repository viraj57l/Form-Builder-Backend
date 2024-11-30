require('dotenv').config();
const express =require('express')
const cors = require('cors');
const connectDB=require('./config/configdb');
const routes= require('./routes/formRoutes');

const app=express();

//enable cors for all origins
app.use(cors());

//middleware to pasre json
app.use(express.json())

//connect database
connectDB();

const PORT =process.env.PORT || 5000;

//routes
app.use('/',routes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
});