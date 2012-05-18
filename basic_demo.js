var mailkit = require('./mailkit.js'); //use just mailkit if installed via NPM

var SMTP = {
service: "Gmail",
    auth: {
        user: "username@gmail.com",
        pass: "userpass"
    }
};

var mailOptions = {
    from_name: "Sender Name",
    //from_addr: "sender@localhost",
    to: "lolkatz@localhost", // can also be a list: "receiver1@example.com, receiver2@example.com"
    subject: "Hello ✔", // Subject line,
    encoding: 'html',
    view: './templates/layout.bt',
    subview: './templates/signup.bt',
    data: {year: '2012'},
    //html: "<b>Hello world ✔</b>",
    //body: "<b>Hello world ✔</b>" //body,
    smtp: SMTP
}

mailkit.send(mailOptions, function(error, status)
{
    console.log(status);
    if (error)
    {
        console.log('an error');
    }
    else
    {
        console.log('not an error!');
    }
});