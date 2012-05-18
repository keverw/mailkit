var mailkit = require('./mailkit.js'); //use just mailkit if installed via NPM

var mailOptions = {
    from_name: "Sender Name",
    from_addr: "sender@localhost",
    to: "lolkatz@localhost", // can also be a list: "receiver1@example.com, receiver2@example.com"
    subject: "Hello ✔", // Subject line,
    encoding: 'both',
    //html: "<b>Hello world ✔</b>",
    body: "<b>Hello world ✔</b>" //body
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