// import dependencies
const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const handlebars = require("handlebars");
const fs = require("fs");
require("dotenv").config();

// instantiate an express app
const app = express();
app.use("/", express.static(__dirname + "/public"));
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
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASS,
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

// read HTML email template
const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

// function called when form is submitted
app.post("/contact", (req, res) => {
  let form = new multiparty.Form();
  let data = {};

  // parse form
  form.parse(req, function (err, fields) {
    // extract data from form
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    readHTMLFile(process.cwd() + "/public/email.html", function (err, html) {
      // read and parse HTML template
      let template = handlebars.compile(html);
      let replacements = {
        name: data.name,
        subject: data.title,
        message: data.message,
        email: data.mail,
      };
      let htmlToSend = template(replacements);

      // create mail object
      const mail = {
        from: {
          name: "Contact Form",
          address: process.env.SENDER_EMAIL,
        },
        to: process.env.RECEPIENT_EMAIL,
        subject: "New contact message from your website🎉",
        text: `${data.name} sent you a message 📥 \n${data.title} : \n${data.message}`,
        html: htmlToSend,
        replyTo: data.mail,
      };

      // send mail
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          console.log("message sent !");
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
  });
});
