
angular.module('AppModule', ['ngRoute', "ngMask"]).config(['$routeProvider', function ($routeProvider)
{

    $routeProvider.when('/perfil',
	{
		templateUrl: 'views/perfil.html',
		controller: 'PessoaController'
	})
	.when('/perfil-novo', {
		templateUrl: 'views/perfil-novo.html',
		controller: 'PessoaController'
	})
	.when('/perfil-juridica-novo', {
		templateUrl: 'views/perfil-juridica-novo.html',
		controller: 'PessoaController'
	})
        .when('/perfil-juridica', {
		templateUrl: 'views/perfil-juridica.html',
		controller: 'PessoaController'
	})
	.when('/leiloes-leiloes', {
		templateUrl: 'views/leiloes-leiloes.html',
		controller: 'LeilaoController'
	})
	
	.when('/perfil-cadastroServico', {
		templateUrl: 'views/perfil-cadastroServico.html',
		controller: 'LeilaoController'
	})
	.when('/leiloes-meusLances', {
		templateUrl: 'views/leiloes-meusLances.html',
		controller: 'LeilaoController'
	})
	.when('/leilao-novo', {
		templateUrl: 'views/leilao-novo.html',
		controller: 'LeilaoController'
	})
	.when('/', {
		templateUrl: 'views/home.html',
		controller: ''
	})
	.when('/sobre', {
		templateUrl: 'views/sobre.html',
		controller: ''
	})
	.when('/leiloes-abertos', {
		templateUrl: 'views/leiloes-abertos.html',
		controller: 'LeilaoController'
	})
	.when('/meus-lances', {
		templateUrl: 'views/meus-lances.html',
		controller: 'LanceController'
	})
	.when('/avaliacao', {
		templateUrl: 'views/avaliacao-do-usuario.html',
		controller: 'AvaliacaoController'
	})
	.when('/login', {
		templateUrl: 'views/logon/login.html',
		controller: 'PessoaController'
	})
	.when('/404', {
		templateUrl: 'views/404.html'
	})
	// PÁGINA NÃO PREVISTA - 404
	.otherwise(
	{
		redirectTo: '/404'
	});
}]).run(function ($rootScope, $http)
{
	$rootScope.isLogged = function ()
	{
		var retorno = false;
		var config =
		{
			method: "GET",
			timeout: 10000,
			responseType: "json",
			url: "/pessoas/isLogged/",
			cache: false
		};

		$http(config).then(sucessHandler, errorHandler);

		function sucessHandler(response)
		{
			if(response.data.user) {
				$rootScope.showMenu = true;
			}
			else {
				$rootScope.showMenu = false;
			}
		}

		function errorHandler(response)
		{
			$rootScope.showMenu = false;
		}

		return retorno;
	};

	$rootScope.isLogged();
	
	$rootScope.deslogar = function ()
	{
		var config =
		{
			method: "POST",
			timeout: 10000,
			responseType: "json",
			url: "/pessoas/logoff/",
			cache: true
		};

		$http(config).then(sucessHandler, errorHandler);

		function sucessHandler(response)
		{
			location.href = "#/";
			$rootScope.showMenu = false;
		}

		function errorHandler(response)
		{

		}
	};

	$rootScope.dateTimeConverter = function (data)
	{
		var partes = data.split(' ');
		var tempo = partes[1];
		var splittedDate = partes[0].split('/').reverse();
		var datetime = splittedDate.join('-') + ' ' + tempo;

		return datetime;
	};

	$rootScope.dateConverter = function (data)
	{
		var splittedDate = data	.split('/').reverse();
		var date = splittedDate.join('-');
		return date;
	};

});



        