const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: '17k1.web2.demo@gmail.com',
    pass: 'abcXYZ123~'
  }
});

transporter.sendMail({
  from: '17ck1 web 2 <17k1.web2.demo@gmail.com>',
  to: 'maithienchi <mtchi2019@gmail.com>',
  subject: 'Hello',
  text: 'Hello world?',
}).then(console.log).catch(console.error);