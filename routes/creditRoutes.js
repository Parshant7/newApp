const express= require('express');
const router = express.Router();

const creditController = require('../controllers/creditController.js');

const {validateExpressValidatorResult} = require('../helper/validationError.js');
const {jwtAuthenticationMiddleware} = require('../middlewares/authentication.js');
const {creditValidation} = require('../middlewares/validations.js');

router.post('/postCreditTransaction', creditValidation, validateExpressValidatorResult, creditController.postCreditTransaction);

module.exports = router;