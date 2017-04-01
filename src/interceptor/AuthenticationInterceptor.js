var SessionManager = require("./../util/SessionManager");
var ErrorGenerator = require("./../util/ErrorGenerator");
var errorHandler = require("./../util/errorHandler");

function needAuthorization(path, method)
{

	var returns = false;
	var paths =
	{
		leiloes: ["POST", "PUT", "DELETE"],
		lances: ["POST", "PUT", "DELETE"],
		pessoas: ["PUT", "DELETE"],
		avaliacoes: ["POST", "PUT", "DELETE"]
	};

	for(var property in paths)
	{
		paths[property].forEach(function (element, index, array)
		{
			if(path == property && method == element)
				returns = true;
		});
	}
	

	if(process.env.NODE_ENV == "development" && process.env.SESSION == "false")
		returns = false;


	return returns;
}

module.exports = function (request, response, next)
{
	var sessionManager = new SessionManager();
	var errorGenerator = new ErrorGenerator();


	if(needAuthorization(request.path.split('/')[1], request.method))
	{
		if(!sessionManager.isLogged(request.session))
		{
			errorGenerator.getNotAuthorizedError(function (err)
			{
				errorHandler(err, response);
			});
		}
		else {
			next();
		}
	}
	else
	{
		next();
	}
	
};

