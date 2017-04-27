var Avaliacao = require("./../model/bean/Avaliacao");
var AvaliacaoDAO = require("./../model/dao/AvaliacaoDAO");
var Avaliacao = require("./../model/bean/Avaliacao");
var AvaliacaoRN = require("./../model/rn/AvaliacaoRN");
var AvaliacaoDAO = require("./../model/dao/AvaliacaoDAO");
var errorHandler = require("./../util/errorHandler");

module.exports = function (router)
{
    //Método de Cadastro
    router.post('/avaliacao', function (request, response)
    {
        //Declaração de objetos e recepção de dados do request
        var rn = new AvaliacaoRN();
        var dao = new AvaliacaoDAO();
        var avaliacao = new Avaliacao();
        var data = request.body;
        //Popula Bean do leilão para validação e persistência
        avaliacao.popularAvaliacao(data);

        //Monta o escopo onde os dados estarão disponíveis, através de callback e executa o cadastro
        rn.cadastrar(avaliacao, dao,  function (err, dbResponse)
        {
            
            if (err)
            {
                errorHandler(err, response);
                
            } else
            {
                response.location("http://" + request.hostname + "/avaliacoes" + dbResponse);
                response.status(201).send({message: "Avaliacao registrada com sucesso!"});
            }
        });
    });

    //Método de Listagem
    router.get('/avaliacoes', function (request, response)
    {
        //Declaração de objetos
        var rn = new AvaliacaoRN();
        var dao = new AvaliacaoDAO();

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
};