const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Treat = require("../models/Treat");

// create json web token
const MAXAGE = process.env.TOKEN_AGE;
const TOKENSECRET = process.env.JWT_SECRET_KEY;

module.exports.postTreatTransaction = async (req, res)=>{

    try{
        let newTransaction = {
            date: req.body.date,
            expenditureType: req.body.receivedFrom,
            otherExpenditureType: req.body.receivedFor,
            treatBy: req.body.treatBy,
            amount: req.body.amount,
            remarks: req.body.remarks
        };

        let trasaction = await Treat.create(newTransaction);

        console.log("saved treat transaction", trasaction);

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