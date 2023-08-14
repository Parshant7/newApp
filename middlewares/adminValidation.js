const { body } = require("express-validator");
const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const jwt = require('jsonwebtoken');
const admin = require("../models/Admin");

const MAXAGE = process.env.TOKEN_AGE;
const TOKENSECRET = process.env.JWT_SECRET_KEY;


module.exports.loginValidation = [
  
  body("email")
   .not()
   .isEmpty()
   .withMessage("Enter Email")
   .bail()
   .isString()
   .withMessage("email must be of type string.")
   .bail()
   .trim()
   .not()
   .isEmpty()
   .withMessage("Enter Email")
   .bail()
   .matches(/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
   .withMessage("Please Enter Valid Email")
   .bail(),
 
 body("password")
   .not()
   .isEmpty()
   .withMessage("Enter Password")
   .bail()
   .isString()
   .withMessage("password must be of type string.")
   .bail()
   .trim()
   .not()
   .isEmpty()
   .withMessage("Enter Password")
   .bail()
   .isLength({ min: 6 })
   .withMessage("Invalid Password ")
   .bail()
 
]

