const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        host: "smtp.gmail.com",
    });

   const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.email,
        subject: options.subject,
        text: options.message,
   };

    await transporter.sendMail(mailOptions);


};

module.exports = sendEmail;