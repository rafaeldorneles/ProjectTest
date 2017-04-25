var Lance = require("./../model/bean/Lance");
var LanceRN = require("./../model/rn/LanceRN");
var LanceDAO = require("./../model/dao/LanceDAO");
var errorHandler = require("./../util/errorHandler");
var ErrorGenerator = require("./../util/ErrorGenerator");

module.exports = function (router)
{
    //Método de Cadastro
    router.post('/lances', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LanceRN();
        var dao = new LanceDAO();
        var lance = new Lance();
        var data = request.body;

        //Popula Bean do leilão para validação e persistência
        lance.popularLance(data);

        //Monta o escopo onde os dados estarão disponíveis, através de callback e executa o cadastro
        rn.cadastrar(request.session, lance, dao, function (err, dbResponse)
        {

            if (err)
            {
                errorHandler(err, response);

            } else
            {
                response.location("http://" + request.hostname + "/lances/" + dbResponse);
                response.status(201).send({message: "Lance dado com sucesso!"});
            }
        });

    });

    //Método de Listagem
    router.get('/lances', function (request, response)
    {
        //Declaração de objetos
        var rn = new LanceRN();
        var dao = new LanceDAO();

        //Execução do método que lista
        rn.buscarPorInteressado(request.session, dao, function (err, lista)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({lista: lista});
            }
        });

    });
	
    //Método de exclusão
    router.delete('/lances/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LanceRN();
        var dao = new LanceDAO();
        var lance = new Lance();
        var data = JSON.parse(request.query.lance);
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();


        //Popula Bean do leilão para validação e persistência
        lance.popularLance(data);
        

        if (lance.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            response.location("http://" + request.host + "/lances/" + lance.getId());
            errorHandler(error, response, 403);
            return;
        }
        
        

        //Método que executa a exclusão dos dados
        rn.deletar(lance, dao, function (err)
        {
            if (err){
                errorHandler(err, response);}
            else
                response.status(200).send();
        });

    });
    
    function tempo(op) {
	if (op == 1) {
		document.getElementById('parar').style.display = "block";
		document.getElementById('comeca').style.display = "none";
	}
	var s = 1;
	var m = 0;
	var h = 0;
	intervalo = window.setInterval(function() {
		if (s == 60) { m++; s = 0; }
		if (m == 60) { h++; s = 0; m = 0; }
		if (h < 10) document.getElementById("hora").innerHTML = "0" + h + "h"; else document.getElementById("hora").innerHTML = h + "h";
		if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + "s"; else document.getElementById("segundo").innerHTML = s + "s";
		if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + "m"; else document.getElementById("minuto").innerHTML = m + "m";		
		s++;
	},1000);
}

function parar() {
	window.clearInterval(intervalo);
	document.getElementById('parar').style.display = "none";
	document.getElementById('comeca').style.display = "block";
}

function volta() {
	document.getElementById('voltas').innerHTML += document.getElementById('hora').firstChild.data + "" + document.getElementById('minuto').firstChild.data + "" + document.getElementById('segundo').firstChild.data + "<br>";
}

function limpa() {
	document.getElementById('voltas').innerHTML = "";
}
//window.onload=tempo;

};

