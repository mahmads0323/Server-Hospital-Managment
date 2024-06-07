import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const ACCOUNT_EMAIL = process.env.ACCOUNT_EMAIL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: ACCOUNT_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      // it will autmoatically genearte acess token
    },
  });

  const mailOptions = {
    from: ACCOUNT_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("error in sending email: ", err);
        return;
      }
      console.log("email sent successfuly: ", info);
    });
  } catch (err) {
    console.log("Error in sending email: " + err);
  }
};

export default sendMail;
// sendMail(
//   "malik29200343@gmail.com",
//   "Hello from nodemailer",
//   "This is sample email sent using nodemailer"
// );
