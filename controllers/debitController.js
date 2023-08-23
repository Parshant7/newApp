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
        errors: [{
          path: "other",
          msg: messages.transactionFailure
        }]
      });
    }
}

module.exports.get_debitPage = async (req, res)=>{
  res.render("debit_home");
}

module.exports.get_records_page = async (req, res)=>{
  res.render("debit_records");
}

module.exports.getDebitRecords = async (req, res)=>{
  console.log(req.body);

  try{
      var fromDate = req.body.fromDate;
      var toDate = req.body.toDate;
      var expenditureType =  req.body.expenditureType;
      var otherExpenditureType = req.body.otherExpenditureType;
      var amount = req.body.amount;
      var remarks = req.body.remarks;

      var filterObj = {};

      if(fromDate){
        filterObj["date"] = { $gte: new Date(fromDate)};
      }
      if(toDate){
        filterObj["date"] = { $lte: new Date(toDate)};
      }
      if(expenditureType){
        filterObj["expenditureType"] = { $eq: expenditureType};
      }
      if(otherExpenditureType){
        filterObj["otherExpenditureType"] = { $eq: otherExpenditureType};
      }
      if(amount){
        filterObj["amount"] = { $eq: amount};
      }
      if(remarks){
        filterObj["remarks"] = { $eq: remarks};
      }
      
      console.log("this is filter object", filterObj);

      let records = await Debit.find(filterObj);

      console.log("fetched debit transaction", records);

      return res.status(statusCode.Created).json({
          messages:messages.fetchSuccess,
          ResponseStatus: responseStatus.success,
          records: records
      });

  } catch (error) {
    console.log(error.message,"error");
    res.status(statusCode.Bad_request).json({
      messages: messages.transactionFailure,
      ResponseStatus: responseStatus.failure,
      errors: [{
        path: "other",
        msg: messages.transactionFailure
      }]
    });
  }

}