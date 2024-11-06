const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    try {

        const transporter = nodemailer.createTransport({

            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_APP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.message
        };

        const info = await transporter.sendMail(mailOptions)

        console.log("Email sent: " + info.response);

        return { success: true };

        // await transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
    } catch (error) {

        console.error('Error sending email:', error);

        return {
            success: false,
            error: 'Failed to send email'
        };
    }
}

module.exports = sendEmail;