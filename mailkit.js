(function() {

	function send(options, callback)
	{
		callback(false, {});
	}
	// Export public API
	var mailkit = {};
	mailkit.send = send;
	module.exports = mailkit;
}());