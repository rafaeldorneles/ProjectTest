var method = LanceRN.prototype;
var ErrorGenerator = require("./../../util/ErrorGenerator.js");

this.errorGenerator;

function LanceRN()
{
    this.errorGenerator = new ErrorGenerator();
    //this.sessionManager = new SessionValidator();

}

method.cadastrar = function (session, lance, dao, callback)
{

    var SessionManager = require("./../../util/SessionManager");
    var manager = new SessionManager();
    
    lance.setInteressado(manager.getUser(session));
    lance.setDataHora(new Date());

    dao.cadastrar(lance, function (err, insertedId)
    {
        callback(err, insertedId);
    });


};

method.getWinner = function (idLeilao, dao, callback)
{
    var moneyImportance = 0.3; //Quanto menor, mais importante 
    var winner;
    var bestPoints;
    dao.buscarPorLeilao(idLeilao, function (err, lances)
    {
        for (var i = 0; i < lances.length; i++)
        {
            var interessado = lances[i].getInteressado();
            var valor = lances[i].getValor();
            var points = interessado.ranking;
            points = points - (valor / moneyImportance);

            //console.log(interessado.nome + " - " + interessado.ranking + " - " + valor + " - " + points);

            if (!winner)
            {
                winner = lances[i];;
                bestPoints = points;
            } else
            {
                if (points > bestPoints)
                {
                    winner = lances[i];
                    bestPoints = points;
                }
            }
        }

        //console.log(winner);
        if (callback)
            callback(err, winner);
        else
        {
            if (err)
                throw err;
        }

    }, {datahora: 1});
};

method.listar = function (dao, callback)
{
    dao.listar(function (err, lista) {
        if (callback)
            callback(err, lista);
        else
        {
            if (err)
                throw err;
        }
    });

};

method.buscarPorInteressado = function (session, dao, callback)
{
    var SessionManager = require("./../../util/SessionManager");
    var manager = new SessionManager();
    var id = manager.getUser(session);
    
    dao.buscarPorInteressado(id, function (err, lista) {
        if (callback)
            callback(err, lista);
        else
        {
            if (err)
                throw err;
        }
    });

};

method.deletar = function (lance, dao, callback)
{

    //if (!isLogged(session, this.sessionManager, this.errorGenerator, callback))
    //return;
    /**
     * Criar condição para verifivar se quem esta deletando realmente é o dono
     * */
    dao.deletar(lance, function (err, dbResponse)
    {
        if (callback)
            callback(err, dbResponse);
        else
        {
            if (err)
                throw err;
        }
    });
};

module.exports = LanceRN;