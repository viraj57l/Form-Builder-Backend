const mongoose =require('mongoose');

const InputSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['email','text','password','number','date'],
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    placeholder:{
        type:String,
    }
});

const FormSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    inputs:{
        type:[InputSchema],
        validate:[arrayLimit,'{PATH} exceeds the limit of 20']
    }
},{timeStamps:true});


function arrayLimit(val) {
    return val.length <= 20;
}

module.exports=mongoose.model("Form",FormSchema);