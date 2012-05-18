#MailKit#

**NOT READY YET. DO NOT USE.**

A simple but powerful email wrapper around [Nodemailer](https://github.com/andris9/Nodemailer).

##Features:##
* raw html body
* basic templating engine.
* Fail 2 Database

##Supports##
* SMTP
* sendmail
* unicode

## Setup ##
To set up diskspace.js on your Node.js server use npm.

    npm install {LATER!!!}

## Basic Usage ##
if no `smtp` details is defined, sendmail will be used by default, this should work on Mac and Linux systems.

```
var mailkit = require('mailkit');

var mailOptions = {
    from: "Sender Name ✔ <sender@example.com>", // sender address
    to: "lolkatz@localhost", // can also be a list: "receiver1@example.com, receiver2@example.com"
    subject: "Hello ✔", // Subject line
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
```

error is true or false.
status is an object with more details

Example object: 

PUT EXAMPLE HERE



## SMTP Usage ##
Also this demos basic templating.

```
var mailkit = require('mailkit');

var SMTP = {
service: "Gmail",
    auth: {
        user: "username@gmail.com",
        pass: "userpass"
    }
};

var mailOptions = {
    from_name: "Your name",
    from_addr: "username@gmail.com",
    to: "lolkatz@localhost", // can also be a list: "receiver1@example.com, receiver2@example.com"
    subject: "Hello ✔", // Subject line,
    mime: 'html',
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
```


## Template Usage ##


## Render ##
If you don't want to send the email, but render the body. We can do that also!

##Mail Options##
* **from** - `Sender Name ✔ <sender@example.com>`
* **from_addr** - `sender@example.com` //`from_addr` will overwrite from
* **from_name** - `Sender Name ✔` //when using `from_addr`, `from_name` will add a name.
* **to** - A single address or list that will appear on the `To:` field
* **cc** - A single address or list that will appear on the `CC:` field
* **bcc** - A single address or list that will appear on the `BCC:` field
* **replyTo** - An e-mail address that will appear on the `Reply-To:` field
* **subject** - The email subject.
* **mime** - `html` or `text` or `both`. Default is `html` if the `mime` is `text` and you send `html`, the `html` will be displayed as `text`.
* **body** - The body, for when not using a template. Using `body` overrides everything in the layout section. Will be used for `html` and `text`
* **html** - override the body, and set your own HTML.
* **text** - overrides the body, and set your own text. You can use both `html` and `text`. HTML will be displayed to clients that support `html`, `text` is a failback for those that don't. If you set the `mime` to both and only provide `html`, `text` will be generated from the `html`.
* **smtp** - refer to the SMTP section for more details, if not defined sendmail will be used as the transporter when you send. If you wish to change your transporter(EG: SMTP details, you'll have to use a new instance of MailKit.)
* **headers** - An object of additional header fields `{"X-Key-Name": "key value"}` (values are passed as is, you should do your own encoding to 7bit if needed)
* **attachments** - An array of attachment objects. See attachment fields for more details.
* **envelope** - optional SMTP envelope, if auto generated envelope is not suitable
**messageId** - optional Message-Id value, random value will be generated if not set. Set to false to omit the Message-Id header


**Layout:**

* **view** - path to view .html file
* **subview** - path to subview, use `{subview}` in your `view` to display this.
* **data** - A Javascript object. 

```
{
	'username': 'Kevin',
	'someother' : 'data'
}
```
and then in your view you use `{username}` to display the username.

**Fail 2 Database:**

##SMTP##

Possible SMTP options are the following:

* **service** - an optional well known service identifier ("Gmail", "Hotmail" etc., see Well known Services for a list of supported services) to auto-configure host, port and secure connection settings
* **host** - hostname of the SMTP server (defaults to "localhost", not needed with `service`)
* **port** - port of the SMTP server (defaults to 25, not needed with `service`)
* **secureConnection** - use SSL (default is `false`, not needed with `service`). If you're using port 587 then keep secureConnection false, since the connection is started in insecure plain text mode and only later upgraded with STARTTLS
* **name** - the name of the client server (defaults to machine name)
* **auth** - authentication object as `{user:"...", pass:"…"}` or  `{XOAuthToken: "base64data"}`
* **ignoreTLS** - ignore server support for STARTTLS (defaults to false)
* **debug** - output client and server messages to console
* **maxConnections** - how many connections to keep in the pool (defaults to 5)

##SMTP envelope##

SMTP envelope is usually auto generated from `from`, `to`, `cc` and `bcc` fields but if for some reason you want to specify it yourself, you can do it with `envelope` property.

`envelope` is an object with the following params: `from`, `to`, `cc` and `bcc` just like with regular mail options. You can also use the regular address format.

```
mailOptions = {
    ...,
    from: "mailer@node.ee",
    to: "daemon@node.ee",
    envelope: {
        from: "Daemon <deamon@node.ee>",
        to: "mailer@node.ee, Mailer <mailer2@node.ee>"
    }
}
```


##Attachment fields##

Attahcment object consists of the following properties:

* **fileName** - filename to be reported as the name of the attached file, use of unicode is allowed (except when using Amazon SES which doesn't like it)
* **cid** - optional content id for using inline images in HTML message source
* **contents** - String or a Buffer contents for the attachment
* **filePath** - path to a file or an URL if you want to stream the file instead of including it (better for larger attachments)
* **streamSource** - Stream object for arbitrary binary streams if you want to stream the contents (needs to support pause/resume)
* **contentType** - optional content type for the attachment, if not set will be derived from the fileName property
* **contentDisposition** - optional content disposition type for the attachment, defaults to "attachment"

One of `contents`, `filePath `or `streamSource` must be specified, if none is present, the attachment will be discarded. Other fields are optional.
Attachments can be added as many as you want.

```
var mailOptions = {
    ...
    attachments: [
        {   // utf-8 string as an attachment
            fileName: "text1.txt",
            contents: "hello world!
        },
        {   // binary buffer as an attachment
        fileName: "text2.txt",
            contents: new Buffer("hello world!,"utf-8")
        },
        {   // file on disk as an attachment
            fileName: "text3.txt",
            filePath: "/path/to/file.txt" // stream this file
        },
        {   // fileName and content type is derived from filePath
            filePath: "/path/to/file.txt"
        },
        {   // stream as an attachment
            fileName: "text4.txt",
            streamSource: fs.createReadStream("file.txt")
        },
        {   // define custom content type for the attachment
            fileName: "text.bin",
            contents: "hello world!,
            contentType: "text/plain"
        },
        {   // use URL as an attachment
            fileName: "license.txt",
            filePath: "https://raw.github.com/andris9/Nodemailer/master/LICENSE"
        }
    ]
}
```

##Using Embedded Images##

Attachments can be used as embedded images in the HTML body. To use this feature, you need to set additional property of the attachment - `cid` (unique identifier of the file) which is a reference to the attachment file. The same `cid` value must be used as the image URL in HTML (using `cid:` as the URL protocol, see example below).

The `cid` value should be as unique as possible!

```
var mailOptions = {
    ...
    html: "Embedded image: <img src='cid:unique@node.ee' />",
    attachments: [{
        filename: "image.png",
        filePath: "/path/to/file",
        cid: "unique@node.ee" //same cid value as in the html img src
    }]
}
```
##Well known services for SMTP##

If you want to use a well known service as the SMTP host, you do not need to enter the hostname or port number, just use the `service` parameter (case sensitive).

Currently cupported services are:

* "**Gmail**" for Google Mail
* "**hot.ee**" for www.hot.ee
* "**Hotmail**" for Microsoft Live Hotmail
* "**iCloud**" for Apple iCloud
* "**mail.ee**" for www.mail.ee
* "**Postmark**" for Postmark App
* "**SendGrid**" for SendGrid
* "**SES**" for Amazon SES
* "**Yahoo**" for Yahoo Mail
* "**Zoho**" for Zoho Mail



Predefined service data covers `host`, `port` and secure connection settings, any other parameters (ie. `auth`) need to be set separately.

##Credits##
This is based on Nodemailer 0.3.20, and some of this readme is based on it's docs.
