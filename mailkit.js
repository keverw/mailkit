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
		
		console.log(options);
		
		callback(false, {});
	}
	// Export public API
	var mailkit = {};
	mailkit.send = send;
	module.exports = mailkit;
}());