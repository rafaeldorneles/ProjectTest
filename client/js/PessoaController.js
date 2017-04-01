
var app = angular.module('AppModule');
app.controller('PessoaController', function($scope, $http, $rootScope)
{
    $scope.cadastrar = function(pessoa)
    {
                  
         if(pessoa.senha != pessoa.confirmaSenha) {
             
        alert("Error: Senhas não conferem!");
        console.log("senha Errada");
        //pessoa.pwd1.focus();
        return false;
    }else{
        
    	function sucessHandler(response)
        {
            alert(response.data.message);
            location.href = "#/"
        }
        
         function errorHandler(response)
        {
            alert("erro ao carregar informações!");
            console.log(response);
        }

        var config =
        {
            method: "POST",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/",
            cache: true,
            data: pessoa
        };

        $http(config).then(sucessHandler, errorHandler);
		
	};

    $scope.signUp = function(pessoa)
    {
        
    	function sucessHandler(response)
        {
            console.log(response);
            alert(response.data.message);
        }

        var config =
        {
            method: "POST",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas",
            cache: true,
            data: pessoa
        };

        $http(config).then(sucessHandler, errorHandler);
		
	}};
        
    $scope.buscar = function(pessoa)
    {
        
        function sucessHandler(response)
        {
            
            $scope.busca = response.data.pessoa;
            $scope.busca.delete = function (pessoa)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == pessoa.id)
                        delete this[i];
                }
            };
            $scope.busca.replace = function (pessoa)
            {
                for (var i = 0; i < this.length; i++)
                {
                    if (this[i].id == pessoa.id)
                        this[i] = pessoa;
                }
            };
        }
        
         function errorHandler(response)
        {
            alert("erro ao carregar informações!");
            console.log(response);
        }

        var config = 
        {
                method: "GET",
                timeout: 10000,
                responseType: "json",
                url: "/pessoas/1234",
                cache: false
                
        };

        $http(config).then(sucessHandler, errorHandler);

    };
    
    $scope.excluir = function(pessoa)
    {

        function sucessHandler(response)
        {
            $scope.busca.delete(pessoa);
            alert("Excluido com sucesso");
            $rootScope.showMenu = false;
            window.location.assign("http://localhost:3000/#/login");
        }
        
         function errorHandler(response)
        {
            alert("erro ao carregar informações!");
            console.log(response);
        }

        var config = 
        {
            method: "DELETE",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/" + pessoa.id,
            cache: false,
            params: {pessoa: pessoa}
        };

        $http(config).then(sucessHandler, errorHandler);
    }
	
    $scope.editar = function(pessoa)
    {
        
        function sucessHandler(response)
        {
            $scope.busca.replace(pessoa);
            //alert(response.data.message);
            //window.location.assign("#/");
           //  $rootScope.showMenu = false;
            alert("OK-Pronto");
            
            
        }
         function errorHandler(response)
        {
            alert("Login ou Senha, incorreto!");
            $rootScope.showMenu = false;
        }
        var config = 
        {
            method: "PUT",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/" + pessoa.id,
            cache: false,
            data: pessoa
        };

        $http(config).then(sucessHandler, errorHandler);
        
        
    }
	
        
    $scope.setInfo = function(pessoa)
    {
        $scope.informacoes = true;
    $scope.pessoa = angular.copy(pessoa)
    }

    $scope.removeInfo = function()
    {
        $scope.informacoes = false;
    }

	$scope.validarSenha = function(cadastro)
	{
	    function validarSenha(cadastro){ 
                
            }
	password = document.formulario.senha.value
	confirmPassword = document.formulario.repetir_senha.value
	if (senha != senhaRepetida){
		alert("Repita a senha corretamente");
		document.formulario.repetir_senha.focus();	
		return false;
	}
}
        
        
    $scope.login = function(pessoa)
    {
        function sucessHandler(response)
        {
            $rootScope.showMenu = true;
            window.location.assign("#/");
            alert("Login com sucesso");
            
            
            
        }

        function errorHandler(response)
        {
            alert("Login ou Senha, incorreto!");
            $rootScope.showMenu = false;
        }

        var config = 
        {
            method: "POST",
            timeout: 10000,
            responseType: "json",
            url: "/pessoas/login/",
            cache: false,
            params: {pessoa: pessoa}
        };

        $http(config).then(sucessHandler, errorHandler);
    };


});
	
