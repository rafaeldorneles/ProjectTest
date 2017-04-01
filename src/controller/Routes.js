module.exports = function(router) 
{
	require("./LeilaoController.js")(router);
	require("./LanceController.js")(router);
	require("./PessoaController.js")(router);
	require("./AvaliacaoController.js")(router);
};