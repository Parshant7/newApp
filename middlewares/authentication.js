const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.js');
const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const { hash, compare } = require("bcrypt");


module.exports.jwtAuthenticationMiddleware = async (req, res, next) => {
    try {
        let jwt_token = req.headers.authorization;
        console.log(jwt_token,"jwt_token");

        // check if token exists or not and that too in bearer part also
        if (!jwt_token || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(statusCode.Bad_request).json({ Message: messages.TokenError, ResponseStatus: responseStatus.failure })
        }
        
        // to have only the token, removing unnecessary bearer part from token
        jwt_token = (req.headers.authorization).split(' ')[1]
        // console.log(jwt_token,"token after short");

        console.log(jwt_token);

        // verify the token given by user for authentication
        jwt.verify(jwt_token, process.env.JWT_SECRET_KEY, async (err, data) => {
            if (err) {
                return res.status(statusCode.Bad_request).json({ Messages: err.message ,ResponseStatus: responseStatus.failure});
            } else {
                console.log(data);
                const admin = await Admin.findOne({email: data.email});

                if(!admin){
                    return res.status(statusCode.Bad_request).json({ Messages: messages.requireLogin, ResponseStatus: responseStatus.failure })
                }
                // to use userId in future for manipulation 
                req.email = data.email;
                next();
            }
        })

    } catch (error) {
        return res.status(statusCode.Bad_request).json({ Messages: error.message, ResponseStatus: responseStatus.failure });
    }
};



