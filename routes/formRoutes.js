const express =require('express');
const router=express.Router();
const formController = require("../controller/formController");
const responseController=require("../controller/responseController");

//show all forms
router.get("/",formController.getForms);

//show form by id
router.get("/form/:id",formController.getFormById);

//create forms
router.post("/form/create",formController.createForm);

//update  forms
router.put("/form/:id/edit",formController.updateForm);

//delete forms
router.delete("/form/:id",formController.deleteForm);

//submit responses for a form
router.post("/form/:id/submitForm",responseController.submitResponse);

module.exports=router;