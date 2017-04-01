var Leilao = require("./../model/bean/Leilao");
var LeilaoRN = require("./../model/rn/LeilaoRN");
var LeilaoDAO = require("./../model/dao/LeilaoDAO");
var errorHandler = require("./../util/errorHandler");
var ErrorGenerator = require("./../util/ErrorGenerator");
var SessionManager = require("./../util/SessionManager");

module.exports = function (router)
{
    //Método de Cadastro
    router.post('/leiloes', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var sessionManager = new SessionManager();
        var usuario = sessionManager.getUser(request.session);
        var data = request.body;

        //Popula Bean do leilão para validação e persistência
        leilao.popularLeilao(data);

        //Monta o escopo onde os dados estarão disponíveis, através de callback e executa o cadastro
        rn.cadastrar(leilao, dao, usuario,function (err, dbResponse)
        {
            
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.location("http://" + request.hostname + "/leiloes/" + dbResponse);
                response.status(201).send({message: "Leilão cadastrado com sucesso!"});
            }
        });

    });

    router.post("/leiloes/encerrar/:id", function (request, response)
	{
		var LanceRN = require("./../model/rn/LanceRN");
		var LanceDAO = require("./../model/dao/LanceDAO");
		var lanceRn = new LanceRN();
		var lanceDao = new LanceDAO();
        var rn = new LeilaoRN();
		var dao = new LeilaoDAO();
		var id = request.params.id;

		rn.encerrar(id, lanceRn, lanceDao, dao, function (err, dbResponse)
		{
			if(err)
			{
				errorHandler(err, response);
			}
			else
			{
				response.status(200).send();
			}

		});
		
	});

    //Método de Listagem
    router.get('/leiloes', function (request, response)
    {
        //Declaração de objetos
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();

        //Execução do método que lista
        rn.listar(dao, function (err, lista)
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
    
    router.get("/leiloes/abertos", function(request, response) 
    {
        //Declaração de objetos
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();

        //Execução do método que lista
        rn.listarAbertos(request.session, dao, function (err, lista)
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

    //Método de busca por id
    router.get('/leiloes/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var id = request.params.id;

        leilao.setId(id);

		//Execução do método que busca pelo id
		rn.buscar(dao, leilao, function (err, leilao)
        {
            if (err)
            {
                errorHandler(err, response);
            } else
            {
                response.status(200).send({leilao: leilao});
            }
        });

    });

    router.get('/leiloes/dono/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var id = request.params.id;
        
		//Execução do método que busca pelo id
		rn.buscarPorDono(dao, id, function (err, lista)
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

    //Método de Edição
    router.put('/leiloes/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var data = request.body;
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();

        //Popula Bean do leilão para validação e persistência
        leilao.popularLeilao(data);

        if (leilao.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            errorHandler(error, response, 403);
            return;
        }

        //Execução do método de edição
        rn.editar(leilao, dao, function (err, dbResponse)
        {
            if (err)
            {
                errorHandler(request, err, response, 304);
            } else
            {
                response.location("http://" + request.host + "/leiloes/" + request.params.id);
                response.status(200).send({message: "Leilão editado com sucesso!"});
            }
        });

    });

    //Método de exclusão
    router.delete('/leiloes/:id', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new LeilaoRN();
        var dao = new LeilaoDAO();
        var leilao = new Leilao();
        var data = JSON.parse(request.query.leilao);
        var id = request.params.id;
        var errorGenerator = new ErrorGenerator();

        //Popula Bean do leilão para validação e persistência
        leilao.popularLeilao(data);

        if (leilao.getId() != id)
        {
            var error = errorGenerator.getResourceConflictError("id");
            errorHandler(error, response, 403);
            return;
        }

        //Método que executa a exclusão dos dados
        rn.deletar(leilao, dao, function (err)
        {
            if (err)
                errorHandler(err, response);
            else
                response.status(200).send();
        });

    });
};