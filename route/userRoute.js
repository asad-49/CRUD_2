const express=require('express');
const router=express.Router();
const {updateProfileValidation,signUpValidation,loginValidation}=require('../helper/valid')
const userController=require('../controllers/userController')
const auth=require('../middleware/auth')
router.post('/register',signUpValidation,userController.register)
router.post('/login',loginValidation,userController.login)
router.get('/get-user',auth.isAuthorize,userController.getUser)
router.post('/update-profile',updateProfileValidation,auth.isAuthorize,userController.updateProfile)
module.exports=router;