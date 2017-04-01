var method = LeilaoDAO.prototype;
var Conexao = require("./Conexao.js");
var Leilao = require("./../bean/Leilao.js");

this.conn;

function LeilaoDAO()
{
    this.conn = new Conexao();
}

method.cadastrar = function (leilao, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.cadastrar(leilao, db, function (err, insertedId)
        {
            leilao.id = insertedId + "";
            conn.editar(leilao, db, function (err, result)
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

        conn.buscar("Leilao", db, function (err, leiloes)
        {
            for (var i = 0; i < leiloes.length; i++)
            {
                var l = new Leilao();
                l.popularLeilao(leiloes[i]);
                leiloes[i] = l;
            }
            
            if(callback)
                callback(err, leiloes);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        });
    });
};

method.listarAbertos = function (userId, callback)
{
    var conn = this.conn;
    var args;
    
    if(userId)
    {
        args = 
        {
            encerrado: false,
            "dono.id": {"$ne": userId}
        }
    }
    else
    {
        args = 
        {
            encerrado: false
        }
    }
    
    
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.buscar("Leilao", db, function (err, leiloes)
        {
            for (var i = 0; i < leiloes.length; i++)
            {
                var l = new Leilao();
                l.popularLeilao(leiloes[i]);
                leiloes[i] = l;
            }
            
            if(callback)
                callback(err, leiloes);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, args);
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

        conn.buscarPorId("Leilao", db, function (err, leiloes)
        {
            var leilao = new Leilao();
            leilao.popularLeilao(leiloes[0]);

            if(callback)
                callback(err, leilao);
            else
            {
                if(err)
                    throw err;
            }
      
            db.close();
        }, id);
        
    });
};

method.buscarPorDono = function (idDono, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.buscar("Leilao", db, function (err, leiloes)
        {
            for (var i = 0; i < leiloes.length; i++)
            {
                var l = new Leilao();
                l.popularLeilao(leiloes[i]);
                leiloes[i] = l;
            }
            
            if(callback)
                callback(err, leiloes);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, {"dono.id": idDono});
    });
};

method.editar = function (leilao, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.editar(leilao, db, function (err, result)
        {
            if(callback)
                callback(err, result);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, leilao.id);
    });
};

method.deletar = function (leilao, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.deletar("Leilao", db, function (err, results)
        {
            if(callback)
                callback(err, results);
            else
            {
                if(err)
                    throw err;
            }
            
        }, leilao.id);
    });
};

function errorHandler(err, callback)
{
    if (callback)
        callback(err);
    else
        throw err;
}

module.exports = LeilaoDAO;