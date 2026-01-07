const nodemailer = require("nodemailer");
const CustomErrorHandler = require("./custom-error-handler");

const sendMessage = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "aziazi22t@gmail.com",
        pass: process.env.APP_KEY,
      },
    });

    return await transporter.sendMail({
      from: "aziazi22t@gmail.com",
      to: email,
      subject: "auto wiki verification code",
      text: "bu kod tasdiqlash uchun",
      html: `<h1><b>${code}</b></h1><br><h3><b>you have 5 minutes to verify</b></h3>`,
    });
  } catch (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }
};

module.exports = sendMessage;