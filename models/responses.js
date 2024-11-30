const mongoose =require('mongoose');

const responseSchema =new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    responses: [{
        inputTitle: String,
        response: mongoose.Schema.Types.Mixed
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    }
})



const Response= mongoose.model('Response',responseSchema);
module.exports=Response;