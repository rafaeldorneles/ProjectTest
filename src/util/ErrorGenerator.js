var method = ErrorGenerator.prototype;

function ErrorGenerator()
{
	
}

method.getNumberFieldError = function(field, callback)
{
	var err = new Error();
	err.message = "Field must be a number.";
	err.field = field;
	err.name = "ERR_NUMBER_FIELD";
	thrower(err, callback);
}

method.getNullFieldError = function(field, callback)
{
	var err = new Error();
	err.message = "Field can't be null.";
	err.field = field;
	err.name = "ERR_NULL_FIELD";
	thrower(err, callback);
}

method.getDateFieldError = function(field, callback)
{
	var err = new Error();
	err.message = "Field must be a Date.";
	err.field = field;
	err.name = "ERR_DATE_FIELD";
	thrower(err, callback);
}

method.getValidationError = function(field, message, callback)
{
	var err = new Error();
	err.message = message;
	err.field = field;
	err.name = "ERR_VALIDATION";
	thrower(err, callback);
}

method.getResourceNotFoundError = function(resource, callback)
{
	var err = new Error();
	err.message = "Resource not found.";
	err.resource = resource;
	err.name = "ERR_RESOURCE_NOT_FOUND";
	thrower(err, callback);
};

method.getLeilaoRun = function(resource, callback)
{
	var err = new Error();
	err.message = "This Leilão have Lance.";
	err.resource = resource;
	err.name = "ERR_RESOURCE_IN_RUN";
	thrower(err, callback);
}
method.getResourceConflictError = function(resource, callback)
{
	var err = new Error();
	err.message = "Resource and resource id did not match.";
	err.resource = resource;
	err.name = "ERR_RESOURCE_CONFLICT";
	thrower(err, callback);
};

method.getNotAuthorizedError = function(callback)
{
	var err = new Error();
	err.message = "You are not authorized to acess this area, please log in.";
	err.name = "ERR_NOT_AUTHORIZED";
	thrower(err, callback);
};

function thrower(err, callback)
{
	if(callback)
		callback(err, null);
	else
		throw err;
};

module.exports = ErrorGenerator;