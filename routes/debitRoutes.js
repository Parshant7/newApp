const express= require('express');
const router = express.Router();

const debitController = require('../controllers/debitController.js');

const {validateExpressValidatorResult} = require('../helper/validationError.js');
const {jwtAuthenticationMiddleware} = require('../middlewares/authentication.js');
const {debitValidation, fetchDebitRecordValidation} = require('../middlewares/validations.js');

router.get('/',debitController.get_debitPage);  //add debit record #page
router.get('/records', debitController.get_records_page);   //post debit record #page
router.post('/postDebitTransaction', debitValidation, validateExpressValidatorResult, debitController.postDebitTransaction);
router.post('/getDebitRecords', debitController.getDebitRecords);

module.exports = router;
