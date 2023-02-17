const nodemailer = require('nodemailer');

const ejs = require('ejs');

const path = require('path')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'milindkrishna1998@gmail.com',

      // Step1: Open this link https://myaccount.google.com/security
        // Step2: Enable 2 factor authentication
        // Click on App passwords just below the 2 factor authentication
        // From Select App options select Other and write your app name it could be any name like mycustomapp
        // It will generate you the password copy the password from the popup and use the following code.
        // Use that copied password in the Auth password section my password
      pass: 'psucqjvqhdbaybwa',
    },
})

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML = template
        }
       )
       return mailHTML
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}