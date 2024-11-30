const Form =require('../models/form');
const Response =require('../models/responses');

const responseController = {
    submitResponse:async(req,res) =>{
        try{
            const{formId, responses}=req.body;

            const formExists= await Form.findById(formId);

            if(!formExists){
                return res.status(400).json({msg:"Form not found"});
            }

            //validations
            if(!responses || !Array.isArray(responses) || responses.length === 0){
                return res.status(400).json({msg:"Invalid response format"});
            }

            const existingResponses= await Response.find({formId});

            //comapre new responses with all other responses

            const isDuplicate = existingResponses.some((existingResponse)=>{
                const existingAnswers=existingResponse.responses.map(r => r.response);
                const newAnswers =responses.map(r => r.response);

                //if responses are the same, return duplicate
                return JSON.stringify(existingAnswers) === JSON.stringify(newAnswers);
            });

            if (isDuplicate) {
                return res.status(400).json({ msg: "Duplicate response detected (same answers)" });
            }

            const newResponse =new Response({
                formId,
                responses,
            });

            await newResponse.save();
            res.status(201).json({msg:"Response submitted sucessfully"});

        }catch(err){
            res.status(500).json({msg:err.message});
        }
    }
}


module.exports=responseController;
