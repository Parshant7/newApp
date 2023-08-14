const { messages, responseStatus, statusCode } = require("../core/constant/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Debit = require("../models/Debit");

// create json web token
const MAXAGE = process.env.TOKEN_AGE;
const TOKENSECRET = process.env.JWT_SECRET_KEY;

module.exports.postDebitTransaction = async (req, res)=>{

    try{
        let newTransaction = {
            date: req.body.date,
            expenditureType:  req.body.expenditureType,
            otherExpenditureType: req.body.otherExpenditureType,
            amount: req.body.amount,
            remarks: req.body.remarks
        }

        let trasaction = await Debit.create(newTransaction);

        console.log("saved debit transaction", trasaction);

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