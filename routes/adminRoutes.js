const express= require('express');
const router = express.Router();

const adminController = require('../controllers/adminController.js');

const {validateExpressValidatorResult} = require('../helper/validationError.js');
const {loginValidation} = require('../middlewares/adminValidation.js');


router.post('/login', loginValidation, validateExpressValidatorResult, adminController.login_post);
router.get('/login', adminController.login_get);
module.exports = router;