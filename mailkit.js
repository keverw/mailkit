(function() {

	var nodemailer = require('nodemailer');
	var transport = null;
	
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
		}
		else if (user_options.view) //templating engine.
		{
			
		}
		//do body settings/detection here
		
		console.log('encoding: ' + encoding);
		console.log(options);
		
		callback(false, {});
	}
	// Export public API
	var mailkit = {};
	mailkit.send = send;
	module.exports = mailkit;
}());