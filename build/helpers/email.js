var nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
// read the contents of the email template file
const templatePath = path.join(__dirname, "../templates/email.hbs");
const template = fs.readFileSync(templatePath, "utf-8");

// compile the template using Handlebars
const compiledTemplate = Handlebars.compile(template);



if(!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD){
    throw new Error(
        "Please set your email credentials"
      );
}

async function sendNotification(payload, res) {
  var mail = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = compiledTemplate({
    name: payload.name,
    email: payload.email,
    amount: payload.amount,
    address: payload.address,
    products: payload.products,
    support: "mailto:"+process.env.EMAIL_ADDRESS
  });

  var mailOptions = {
    from: "Bitcoin⚡Shop <tobilobaojuolape@gmail.com>",
    to: `${payload.email},${process.env.EMAIL_ADDRESS}`,
    replyTo: "tobilobaojuolape@gmail.com",
    subject: "Your order has been recieved, "+payload.name,
    html: html,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      return;
    } else {
      res.status(200).json({
        message: "Email sent successfully",
      });
      return;
    }
  });
}

module.exports = sendNotification;
