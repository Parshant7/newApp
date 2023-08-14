const express= require('express');
const router = express.Router();

const debitController = require('../controllers/debitController.js');

const {validateExpressValidatorResult} = require('../helper/validationError.js');
const {jwtAuthenticationMiddleware} = require('../middlewares/authentication.js');
const {debitValidation} = require('../middlewares/validations.js');

router.post('/postDebitTransaction', debitValidation, validateExpressValidatorResult, debitController.postDebitTransaction);

module.exports = router;