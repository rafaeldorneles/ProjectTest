var method = AvaliacaoRN.prototype;
var errorHandler = require("./../../util/errorHandler");
var ErrorGenerator = require("./../../util/ErrorGenerator");
var isValidDate = require("./../../util/isValidDate");
var SessionValidator = require("./../../util/SessionManager");

this.errorGenerator;
this.sessionManager;
function AvaliacaoRN()
{
    this.errorGenerator = new ErrorGenerator();
    this.sessionManager = new SessionValidator();
}

method.cadastrar = function (avaliacao, dao,  callback)
{
    
    if (isNull(avaliacao, callback, this.errorGenerator))
        return;

    if (!isNumber(avaliacao, callback, this.errorGenerator))
        return;
    
  //  leilao.setDono(session.user);

    dao.cadastrar(avaliacao, function (err, dbResponse)
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

method.buscar = function (dao, avaliacao, callback)
{
    dao.buscar(avaliacao.id, function (err, avaliacao)
    {
        if (callback)
            callback(err, avaliacao);
        else
        if (err)
            throw err;
    });
};


method.deletar = function (avaliacao, dao, callback)
{

    /**
     * Criar condição para verifivar se quem esta deletando realmente é o dono
     * */
    dao.deletar(avaliacao, function (err, dbResponse)
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

method.editar = function (avaliacao, dao,  callback)
{
    if (isNull(avaliacao, callback, this.errorGenerator))
        return;

    if (hasLance(avaliacao, callback, this.errorGenerator))
        return;
    if (!isNumber(avaliacao, callback, this.errorGenerator))
        return;
    
    dao.editar(avaliacao, function (err, dbResponse)
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

function isNumber(avaliacao, callback, errorGenerator)
{
    if (isNaN(avaliacao.getNota()))
    {
        errorGenerator.getNumberFieldError("nota", callback);
        return false;
    }

    return true;
}

function isNull(avaliacao, callback, errorGenerator)
{
    if (avaliacao.getNota() == null)
    {
        errorGenerator.getNullFieldError("nota", callback);
        return true;
    }
    
    if (avaliacao.getDescricao() == null)
    {
        errorGenerator.getNullFieldError("descricao", callback);
        return true;
    }

    return false;
}


module.exports = AvaliacaoRN;