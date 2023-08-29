var nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const { getProductNames } = require("../utils/productName");
const { sumAmount } = require("../utils/sumAmount");
const templatePath = path.join(__dirname, "../templates/email.hbs");
const template = fs.readFileSync(templatePath, "utf-8");

const compiledTemplate = Handlebars.compile(template);

if (!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD) {
  throw new Error("Please set your email credentials");
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
    amount: sumAmount(payload.products),
    address: payload.address,
    products: getProductNames(payload.products),
    support: "mailto:" + process.env.EMAIL_ADDRESS,
  });

  var mailOptions = {
    from: `"Bitcoin⚡Shop <${process.env.EMAIL_ADDRESS}>"`,
    to: `${payload.email},${process.env.EMAIL_ADDRESS}`,
    replyTo: process.env.EMAIL_ADDRESS,
    subject: "Your order has been received, " + payload.name,
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
