// import dependencies
const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

// instantiate an express app
const app = express();
app.use('/', express.static(__dirname + '/public'))
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// setting up port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

//nodeMailer
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


app.post("/contact", (req, res) => {
  
  let form = new multiparty.Form();
  let data = {};

  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    // create mail object
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.title,
      text: `${data.name} <${data.mail}> \n${data.message}`,
    };

    // send mail
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});
