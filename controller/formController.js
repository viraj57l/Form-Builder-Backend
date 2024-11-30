const { default: mongoose } = require('mongoose');
const Form =require('../models/form');

const formController={

    getForms:async(req,res) =>{
        try{
            const forms= await Form.find();
            res.json({result:forms.length,forms})
        }catch(err){
            res.status(500).json({msg:err.message})
        }

    },
    getFormById:async(req,res) =>{
        try{
            const { id } = req.params;

            const form =await Form.findById(id);

            if(!form){
                return res.status(400).json({msg:"Form not Found"});
            }

            res.status(200).json({ form });

        }catch(err){
            console.error(err);
            res.status(500).json({msg:err.message})
        }
    },
    createForm:async(req,res) =>{
        try{
            const {title,inputs} = req.body;
            if(!title || !inputs){
                return res.status(400).json({msg:"Title and inputs are required"});
            }

            //creating a form 
            const newForm= new Form({
                title,
                inputs
            });

            //saving to database
            await newForm.save();
            res.status(200).json({msg:"Form created successfully"});

        }catch(err){
            res.status(500).json({msg:err.message});
        }
    },
    updateForm:async(req,res) =>{
        try{
            //extracting id from params
            const {id}=req.params;

            const {title,inputs}=req.body;

            const form =await Form.findById(id);

            if(!form){
                return res.status(400).json({msg:"Form not Found"});
            }

            //update the form fields if it is provided
            form.title =title || form.title;
            form.inputs= inputs || form.inputs;

            //saving in database
            await form.save();

            //return the form in json
            res.json(form);


        }catch(err){
            res.status(500).json({msg:err.message});
        }

    },
    deleteForm:async(req,res) =>{
        //extracting id of form which is needed to delete
        const {id}= req.params;
        
        //deleting form
        const form = await Form.findByIdAndDelete(id);

        //if no form is found
        if(!form){
            return res.status(400).json({msg:"Form not Found"});
        }

        res.status(200).json({msg:"Form deleted successfully"})
    }
}

module.exports=formController;
  

