var app = angular.module('AppModule');


app.controller('LeilaoController', function ($scope, $http, $rootScope)
{
    $scope.cadastrar = function (leilao)
    {

        function sucessHandler(response)
        {
            console.log(response);
            alert(response.data.message);
            window.location.href = "#/";
        }

        var config =
                {
                    method: "POST",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes",
                    cache: true,
                    data: leilao
                };

        $http(config).then(sucessHandler, errorHandler);

    };

    $scope.listar = function ()
    {

        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

            $scope.lista.delete = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        delete this[i];
                }
            };

            $scope.lista.replace = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        this[i] = leilao;
                }
            };

        }

        var config =
                {
                    method: "GET",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes",
                    cache: false
                };

        $http(config).then(sucessHandler, errorHandler);

    }
    
    $scope.listarAbertos = function ()
    {

        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

            $scope.lista.delete = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        delete this[i];
                }
            };

            $scope.lista.replace = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        this[i] = leilao;
                }
            };

        }

        var config =
                {
                    method: "GET",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes/abertos",
                    cache: false
                };

        $http(config).then(sucessHandler, errorHandler);

    }

    $scope.deletar = function (leilao, lista)
    {

        function sucessHandler(response)
        {
            lista.delete(leilao);
        }

        var config =
                {
                    method: "DELETE",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes/" + leilao.id,
                    cache: false,
                    params: {leilao: leilao}
                };

        $http(config).then(sucessHandler, errorHandler);
    }

    $scope.editar = function (leilao)
    {
        function sucessHandler(response)
        {
            $scope.lista.replace(leilao);
            alert(response.data.message);
        }


        var config =
                {
                    method: "PUT",
                    timeout: 10000,
                    responseType: "json",
                    url: "/leiloes/" + leilao.id,
                    cache: false,
                    data: leilao
                };

        $http(config).then(sucessHandler, errorHandler);
    }
    
    $scope.cadastrarLance = function (lance, leilao)
    {

        function sucessHandler(response)
        {
            console.log(response);
            window.location.href = "#/meus-lances";
            alert("Lance registrado!");

        }
        lance.leilao = leilao;
        console.log(lance);
        var config =
                {
                    method: "POST",
                    timeout: 10000,
                    responseType: "json",
                    url: "/lances",
                    cache: true,
                    data: lance
                };
                

        $http(config).then(sucessHandler, errorHandler);
    };


	$scope.setInfo = function(leilao)
	{
		$scope.informacoes = true;
		$scope.leilao = angular.copy(leilao)
	};
	
	$scope.encerrar = function (id)
	{
		function  sucessHandler()
		{
			alert("Encerrado");
		}
		var config =
		{
			method: "POST",
			timeout: 10000,
			responseType: "json",
			url: "/leiloes/encerrar/" + id,
			cache: false
		};

		$http(config).then(sucessHandler, errorHandler);
	};
	

    $scope.removeInfo = function ()
    {
        $scope.informacoes = false;
    }

    $scope.setInfoLance = function ()
    {
        $scope.campoLance = true;
        //$scope.lance = angular.copy(lance)
    };

    $scope.removeInfoLance = function ()
    {
        $scope.campoLance = false;
    };

    $scope.listarPorDono = function ()
    {
        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

            $scope.lista.delete = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        delete this[i];
                }
            };

            $scope.lista.replace = function (leilao)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == leilao.id)
                        this[i] = leilao;
                }
            };

        }

		var idDono;

		$http
		(
			{
				method: "GET",
				timeout: 10000,
				responseType: "json",
				url: "/pessoas/isLogged/",
				cache: false
			}
		)
		.then(function (response)
		{
			var config =
			{
				method: "GET",
				timeout: 10000,
				responseType: "json",
				url: "/leiloes/dono/"+response.data.user.id,
				cache: false
			};

			$http(config).then(sucessHandler, errorHandler);
		},
		function (response) {
		{

		}
		});
    };

    $scope.opCategorias =
    [           {value: 1, text: "Adestramento de animais"},
                {value: 2, text: "Aulas Particulares"},
                {value: 3, text: "Aulas ou cursos esportivos"},
                {value: 4, text: "Buffet a Domicilio"},
                {value: 5, text: "Criação de Sites, Aplicativos e afins"},
                {value: 6, text: "Conserto De celulares"},
                {value: 7, text: "Decoração de interiores"},
                {value: 8, text: "Frete"},
                {value: 9, text: "Manuntenção de computadores"},  
                {value: 10, text: "Serviços Contabeis"},
                {value: 11, text: "Serviços Gerais"},
                {value: 12, text: "Serviços de Instação de ar condicionado"},
                {value: 13, text: "Serviços de Manufatura"},
                {value: 14, text: "Serviços de Manutenção Predial"},
                {value: 5555, text: "Serviços de Diversos (Outros)"}
            ];

    $scope.opCategorias.find = function (id)
    {
        for (var i = 0; i < this.length; i++)
        {
            if (this[i].value == id)
                return this[i];

        }
    };

    function errorHandler(response)
    {
        console.log(response.data.error);
        alert(response.data.errorMessage);
    }
});

