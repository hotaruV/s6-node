const mailer = require("nodemailer");
// const transporter = mailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     secure: false,
//     auth: {
//         user: "2fab07f20ad667",
//         pass: "99404d74e7add5",
//     },
// });

const transporter = mailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "administracion@hospitalolga.com",
        pass: "hospitalOlgaAdminM4il#",
    },
});

transporter.verify().then(() => {
    console.log("send mail ready");
})

module.exports = transporter;