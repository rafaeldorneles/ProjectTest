var method = AvaliacaoDAO.prototype;
var Conexao = require("./Conexao.js");
var Avaliacao = require("./../bean/Avaliacao.js");

this.conn;

function AvaliacaoDAO()
{
    this.conn = new Conexao();
}

method.cadastrar = function (avaliacao, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.cadastrar(avaliacao, db, function (err, insertedId)
        {
            avaliacao.id = insertedId + "";
            conn.editar(avaliacao, db, function (err, result)
            {
                if (callback)
                callback(err, insertedId);
                else
                {
                    if (err)
                        throw err;
                }

            db.close();
            }, insertedId);
            
        });
    });
};

method.listar = function (callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.buscar("Avaliacao", db, function (err, avaliacoes)
        {
            for (var i = 0; i < avaliacoes.length; i++)
            {
                var a = new Avaliacao();
                a.popularAvaliacao(avaliacoes[i]);
                avaliacoes[i] = a;
            }
            
            if(callback)
                callback(err, avaliacoes);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        });
    });
};

method.buscar = function (id, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.buscarPorId("Avaliacao", db, function (err, avaliacoes)
        {
            var avaliacao = new Avaliacao();
            avaliacao.popularLeilao(avaliacoes[0]);

            if(callback)
                callback(err, avaliacao);
            else
            {
                if(err)
                    throw err;
            }
      
            db.close();
        }, id);
        
    });
};

method.editar = function (avaliacao, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.editar(avaliacao, db, function (err, result)
        {
            if(callback)
                callback(err, result);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, avaliacao.id);
    });
};

method.deletar = function (avaliacao, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.deletar("Avaliacao", db, function (err, results)
        {
            if(callback)
                callback(err, results);
            else
            {
                if(err)
                    throw err;
            }
            
        }, avaliacao.id);
    });
};

function errorHandler(err, callback)
{
    if (callback)
        callback(err);
    else
        throw err;
}

module.exports = AvaliacaoDAO;