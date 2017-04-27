var app = angular.module('AppModule');

app.controller('AvaliacaoController', function ($scope, $http)
{
    
    $scope.cadastrarAvaliacao = function (avaliacao)
    {
        console.log('cadastrarAvaliacao');

        function sucessHandler(response)
        {
            alert("Avaliação Concluida");
        }
        
        console.log(avaliacao);
        var config =
                {
                    method: "POST",
                    timeout: 10000,
                    responseType: "json",
                    url: "/avaliacao",
                    cache: true,
                    data: avaliacao
                };

        $http(config).then(sucessHandler, errorHandler);
    };
    
    $scope.listarAvaliados = function ()
    {

        function sucessHandler(response)
        {
            $scope.listaAvaliados = response.data.lista;
            console.log(response.data.lista);
        }

        var config =
                {
                    method: "GET",
                    timeout: 10000,
                    responseType: "json",
                    url: "/pessoas",
                    cache: false
                };

        $http(config).then(sucessHandler, errorHandler);

    }

    $scope.opNota = [
        {value: 1, text: "Ruim", var: nota=5}, 
        {value: 2, text: "Regular",var: nota=9}, 
        {value: 3, text: "Bom",var: nota=15},
        {value: 4, text: "Muito Bom",var: nota=18},
        {value: 5, text: "Excelente",var: nota=24}
    ];
    
    
    function errorHandler(response)
    {
        console.log(response);
    }
});

