const { body } = require("express-validator");
// const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const expendituretypes = ["Breakfast", "Lunch", "Dinner", "Snacks", "Grocery", "Others"];

module.exports.debitValidation = [

  body("expenditureType")
     .isString()
     .withMessage("expenditureType name must be of type string.")
     .bail()
     .trim()
     .not()
     .isEmpty()
     .withMessage("Please enter Expenditure Type")
     .bail()
     .isLength({ min: 2, max: 255 })
     .withMessage("Please enter a valid Expenditure Type")
     .bail()
     .custom(async (value, {req})=>{
      if (! expendituretypes.includes(value)){
        throw new Error("invalid expenditure type");
      }
    }),

  body("amount")
    .not()
    .isEmpty()
    .withMessage("Please enter Amount")
    .bail()
    .isNumeric()
    .withMessage("Amount must be of type number.")
    .bail()
    .matches(/^\d+$/)
    .withMessage("Amount can contain numbers only")
    .bail()
    .isLength({ min: 1})
    .withMessage("Please enter a valid phone number")
    .bail(),

  body("date")
    .not()
    .isEmpty()
    .withMessage("Please enter date")
    .bail()
    .isString()
    .withMessage("date must be of type string.")
    .bail()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter date")
    .bail()
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .withMessage("Please enter a valid date")
    .bail()
];


module.exports.creditValidation = [

  body("receivedFrom")
     .isString()
     .withMessage("name must be of type string.")
     .bail()
     .trim()
     .not()
     .isEmpty()
     .withMessage("Please enter name")
     .bail()
     .isLength({ min: 2, max: 255 })
     .withMessage("Please enter a valid name")
     .bail(),

  body("receivedFor")
     .isString()
     .withMessage("receivedFor must be of type string.")
     .bail()
     .trim()
     .not()
     .isEmpty()
     .withMessage("Please enter receivedFor")
     .bail()
     .isLength({ min: 2, max: 255 })
     .withMessage("Please enter a valid receivedFor entry")
     .bail(),

  body("amount")
    .not()
    .isEmpty()
    .withMessage("Please enter Amount")
    .bail()
    .isNumeric()
    .withMessage("Amount must be of type number.")
    .bail()
    .matches(/^\d+$/)
    .withMessage("Amount can contain numbers only")
    .bail()
    .isLength({ min: 1})
    .withMessage("Please enter a valid phone number")
    .bail(),

  body("date")
    .not()
    .isEmpty()
    .withMessage("Please enter date")
    .bail()
    .isString()
    .withMessage("date must be of type string.")
    .bail()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter date")
    .bail()
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .withMessage("Please enter a valid date")
    .bail()
];


module.exports.treatValidation = [

  body("expenditureType")
     .isString()
     .withMessage("expenditureType name must be of type string.")
     .bail()
     .trim()
     .not()
     .isEmpty()
     .withMessage("Please enter Expenditure Type")
     .bail()
     .isLength({ min: 2, max: 255 })
     .withMessage("Please enter a valid Expenditure Type")
     .bail(),

  body("amount")
    .not()
    .isEmpty()
    .withMessage("Please enter Amount")
    .bail()
    .isNumeric()
    .withMessage("Amount must be of type number.")
    .bail()
    .matches(/^\d+$/)
    .withMessage("Amount can contain numbers only")
    .bail()
    .isLength({ min: 1})
    .withMessage("Please enter a valid phone number")
    .bail(),

  body("date")
    .not()
    .isEmpty()
    .withMessage("Please enter date")
    .bail()
    .isString()
    .withMessage("date must be of type string.")
    .bail()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter date")
    .bail()
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    .withMessage("Please enter a valid date")
    .bail(),
];
