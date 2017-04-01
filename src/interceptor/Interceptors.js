module.exports = function (request, response, next)
{
	require("./AuthenticationInterceptor")(request, response, next);
};