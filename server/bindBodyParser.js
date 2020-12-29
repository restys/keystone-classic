var bodyParser = require('body-parser');

var uploads = require('../lib/uploads');

module.exports = function bindBodyParser (keystone, app) {
	// Set up body options and cookie parser
	var bodyParserParams = {};
	if (keystone.get('file limit')) {
		bodyParserParams.limit = keystone.get('file limit');
	}
	app.use(bodyParser.json(bodyParserParams));
	app.use(bodyParser.urlencoded({limit: '30mb', extended: true, parameterLimit: 100000}));//here to fix PayloadTooLargeError: too many parameters
	bodyParserParams.extended = true;
	app.use(bodyParser.urlencoded(bodyParserParams));
	if (keystone.get('handle uploads')) {
		uploads.configure(app, keystone.get('multer options'));
	}
};
