const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const {handleErrors} = require("../helper/helperFunctions");

// create json web token
const MAXAGE = process.env.TOKEN_AGE;
const TOKENSECRET = process.env.JWT_SECRET_KEY;

module.exports.login_post = async (req, res)=>{

    try{

        let admin = await Admin.findOne({ email: req.body.email});

        console.log(req.body.email, admin);

        if(!admin){
            return res.status(statusCode.Bad_request).json({
                message: messages.unauthorizedEmail,
                ResponseStatus: responseStatus.failure,
                errors: [{
                    msg: messages.unauthorizedEmail,
                    path: "email",
                }]
              });
        }

        if(await bcrypt.compare(req.body.password, admin.password)){
            const token = jwt.sign({ email: admin.email, role: "admin" }, TOKENSECRET, {
                expiresIn: MAXAGE,
            });

            res.cookie('jwt', `Bearer ${token}`, { httpOnly: true, maxAge: MAXAGE});

            return res.status(statusCode.Created).json({
                message: messages.loginSuccess,
                ResponseStatus: responseStatus.success,
                jwToken: token,
            });
        }
        else {
            return res.status(statusCode.Bad_request).json({
                message: messages.UnauthorizedPassword,
                ResponseStatus: responseStatus.failure,
                errors: [{
                    msg: messages.UnauthorizedPassword,
                    path: "password",
                }]
            });
        }

    } catch (error) {
      console.log(error.message,"error");
      res.status(statusCode.Bad_request).json({
        messages: messages.loginError,
        ResponseStatus: responseStatus.failure,
        errors: [{
            msg: messages.serverErr,
            path: "other",
        }]
      });
    }
}

module.exports.login_get = async (req, res)=>{
    res.render("login");
} 