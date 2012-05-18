(function() {

	//helper functions
	function numKeys(obj)
	{
    	var count = 0;
    	for(var prop in obj)
    	{
    	    count++;
    	}
    	return count;
	}

	//module
	var nodemailer = require('nodemailer');
	var transport = null;
	
	function send_part2(encoding, user_options, options, callback) //Check for SMTP and then send!
	{
		if (transport == null)
		{
			if (numKeys(user_options.smtp) > 0) //Set SMTP ideas
			{
				transport = nodemailer.createTransport('SMTP', user_options.smtp);
			}
			else //sendmail
			{
				transport = nodemailer.createTransport('sendmail');
			}
		}
		
		//send
		console.log('encoding: ' + encoding);
		console.log(options);
		transport.sendMail(options, function(error, response)
		{
			if(error)
			{
				callback(true, response);
			}
			else
			{
				callback(false, response);
			}
		});
	}
	
	function send(user_options, callback)
	{
		var options = {};
		
		//Set the from option
		if (user_options.from_addr)
		{
			if (user_options.from_name)
			{
				options.from = user_options.from_name + ' <' + user_options.from_addr + '>';
			}
			else
			{
				options.from = user_options.from_addr;
			}
		}
		else if (user_options.from)
		{
			options.from = user_options.from;
		}
		
		//Set the to option
		if (user_options.to)
		{
			options.to = user_options.to;
		}
		
		//Set the cc option
		if (user_options.cc)
		{
			options.cc = user_options.cc;
		}
		
		//Set the bcc option
		if (user_options.bcc)
		{
			options.bcc = user_options.bcc;
		}
		
		//Set the bcc option
		if (user_options.replyTo)
		{
			options.replyTo = user_options.replyTo;
		}
		
		//set the subject option
		if (user_options.subject)
		{
			options.subject = user_options.subject;
		}
		
		//Set encoding
		if (user_options.encoding == 'text') //text
		{
			var encoding = 'text';
		}
		else if (user_options.encoding == 'html') //html
		{
			var encoding = 'html';
		}
		else if (user_options.encoding == 'both') //html
		{
			var encoding = 'both';
		}
		else //html
		{
			var encoding = 'html';
		}
		
		//body
		if (user_options.html || user_options.text)
		{
			if (encoding == 'both' && !user_options.text)
			{
				options.generateTextFromHTML = true;
			}
			
			if (user_options.html)
			{
				if (encoding == 'text')
				{
					options.text = user_options.html;
				}
				else
				{
					options.html = user_options.html;
				}
			}
			
			if (user_options.text)
			{
				options.text = user_options.text;
			}
			
			send_part2(encoding, user_options, options, callback);
			
		}
		else if (user_options.body)
		{
			if (encoding == 'both')
			{
				options.generateTextFromHTML = true;
				options.html = user_options.body;
			}
			else if (encoding == 'html')
			{
				options.html = user_options.body;
			}
			else //text
			{
				options.text = user_options.body;
			}
			
			send_part2(encoding, user_options, options, callback);
		}
		else if (user_options.view) //template engine.
		{
			render(user_options, function(err, html)
			{
    			console.log(err);
    			if (err)
    			{
    				callback(true, {type: 'template', template_error: err});
    			}
    			else
    			{
	    			if (encoding == 'both')
					{
						options.generateTextFromHTML = true;
						options.html = html;
					}
					else if (encoding == 'html')
					{
						options.html = html;
					}	
					else //text
					{
						options.text = html;
					}    			
    				send_part2(encoding, user_options, options, callback);
    			}
			});
		}
	}
	
	function render(user_options, callback)
	{
		var basictemplate = require('basictemplate');
		if (user_options.subview) //Contains a subview
		{
			basictemplate.render_sub(user_options.view, user_options.subview, user_options.data, function(err, html)
			{
    			callback(err, html);
			});
		}
		else //just a single view
		{
			basictemplate.render(user_options.view, user_options.data, function(err, html)
			{
    			callback(err, html);
			});
		}
	}
	// Export public API
	var mailkit = {};
	mailkit.send = send;
	mailkit.render = render;
	module.exports = mailkit;
}());