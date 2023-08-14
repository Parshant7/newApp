const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Credit = require("../models/Credit");

// create json web token
const MAXAGE = process.env.TOKEN_AGE;
const TOKENSECRET = process.env.JWT_SECRET_KEY;

module.exports.postCreditTransaction = async (req, res)=>{

    try{
        let newTransaction = {
            date: req.body.date,
            receivedFrom: req.body.receivedFrom,
            receivedFor: req.body.receivedFor,
            amount: req.body.amount,
            remarks: req.body.remarks
        }

        let trasaction = await Credit.create(newTransaction);

        console.log("saved Credit transaction", trasaction);

        return res.status(statusCode.Created).json({
            messages:messages.transactionSuccess,
            ResponseStatus: responseStatus.success,
        });

    } catch (error) {
      console.log(error.message,"error");
      res.status(statusCode.Bad_request).json({
        messages: messages.transactionFailure,
        ResponseStatus: responseStatus.failure,
      });
    }
    
}