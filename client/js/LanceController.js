var app = angular.module('AppModule');


app.controller('LanceController', function ($scope, $http)
{

    $scope.setInfo = function (lance)
    {
        $scope.informacoes = true;
        $scope.lance = angular.copy(lance)
    }

    $scope.removeInfo = function ()
    {
        $scope.informacoes = false;
    }


    $scope.cadastrarLance = function (lance, leilao)
    {

        function sucessHandler(response)
        {
            console.log("emrie");
            window.location.href = "#/";
            //alert(response.data.message);

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


    $scope.listar = function ()
    {

        function sucessHandler(response)
        {
            $scope.lista = response.data.lista;

            $scope.lista.delete = function (lance)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == lance.id)
                        delete this[i];
                }
            };

            $scope.lista.replace = function (lance)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == lance.id)
                        this[i] = lance;
                }
            };

        }



        var config =
                {
                    method: "GET",
                    timeout: 10000,
                    responseType: "json",
                    url: "/lances",
                    cache: false
                };

        $http(config).then(sucessHandler, errorHandler);

    }

    $scope.deletar = function (lance, lista)
    {

        function sucessHandler(response)
        {
            lista.delete(lance);
            alert("Lance excluido com sucesso!");
            window.location.reload();
        }

        var config =
                {
                    method: "DELETE",
                    timeout: 10000,
                    responseType: "json",
                    url: "/lances/" + lance.id,
                    cache: false,
                    params: {lance: lance}
                };
                console.log(lance);
        $http(config).then(sucessHandler, errorHandler);
    }

    function errorHandler(response)
    {
        console.log(response);
        //alert(response.data.errorMessage);
    }
});

