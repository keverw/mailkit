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
		else if (user_options.view) //template engine.
		{
			render(user_options, function(err, html)
			{
    			console.log(err);
    			console.log(html);
			});
		}
		//do body settings/detection here
		
		console.log('encoding: ' + encoding);
		console.log(options);
		
		//callback(false, {});
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