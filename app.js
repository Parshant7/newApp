require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes.js');
const debitRoutes = require('./routes/debitRoutes.js');
const creditRoutes = require('./routes/creditRoutes.js');
const treatRoutes = require('./routes/treatRoutes.js');

const {requireAuth} = require('./middlewares/authentication.js');

const path = require('path');

const PORT = process.env.PORT || 3000;
const DBURI = process.env.dbURI;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use('/', adminRoutes);
app.use('/debit/', requireAuth, debitRoutes);
app.use('/credit/', requireAuth, creditRoutes);
app.use('/treat/', requireAuth, treatRoutes);


mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));  

app.get('/', requireAuth, (req, res)=>{
  res.render("home");
});

app.listen(PORT, ()=>{
  console.log("app listening on port ", PORT);
});

