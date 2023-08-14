const express= require('express');
const router = express.Router();

const treatController = require('../controllers/treatController.js');

const {validateExpressValidatorResult} = require('../helper/validationError.js');
const {treatValidation} = require('../middlewares/validations.js');

router.post('/postTreatTransaction', treatValidation, validateExpressValidatorResult, treatController.postTreatTransaction);

module.exports = router;