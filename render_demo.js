var mailkit = require('./mailkit.js'); //use just mailkit if installed via NPM

var mailOptions = {
    view: './templates/layout.bt',
    subview: './templates/signup.bt',
    data: {year: '2012'}
}

mailkit.render(mailOptions, function(error, html)
{
    if (error)
    {
        console.log('an error');
        console.log(error);
    }
    else
    {
    	var fs = require('fs');
		fs.writeFile('./demo.html', html, 'utf8', function(err) {
    		if(err) {
        		console.log(err);
    		} else {
        		console.log("The file was saved!");
    		}
		}); 
    }
});