method = LanceDAO.prototype;
var Lance = require("./../bean/Lance");
var Conexao = require('./Conexao');

this.conn;
function LanceDAO()
{
    this.conn = new Conexao();
}

method.cadastrar = function (lance, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.cadastrar(lance, db, function (err, insertedId)
        {
            lance.setId(insertedId);
            conn.editar(lance, db, function(err, result)
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

        conn.buscar("Lance", db, function (err, lances)
        {
            for (var i = 0; i < lances.length; i++)
            {
                var l = new Lance();
                l.popularLance(lances[i]);
                lances[i] = l;
            }
            
            if(callback)
                callback(err, lances);
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

        conn.buscarPorId("Lance", db, function (err, lances)
        {
            var lance = new Lance();
            lance.popularLeilao(lance[0]);

            if(callback)
                callback(err, lance);
            else
            {
                if(err)
                    throw err;
            }
      
            db.close();
        }, id);
        
    });
};

method.buscarPorLeilao = function (id, callback, sort)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.buscar("Lance", db, function (err, lances)
        {
            for (var i = 0; i < lances.length; i++)
            {
                var l = new Lance();
                l.popularLance(lances[i]);
                lances[i] = l;
            }
            
            if(callback)
                callback(err, lances);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, {"leilao.id": id}, sort);
    });
};

method.buscarPorInteressado = function (idInteressado, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.buscar("Lance", db, function (err, lances)
        {
            for (var i = 0; i < lances.length; i++)
            {
                var l = new Lance();
                l.popularLance(lances[i]);
                lances[i] = l;
            }
            
            if(callback)
                callback(err, lances);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, {interessado: idInteressado});
    });
};

method.editar = function (lance, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.editar(lance, db, function (err, result)
        {
            if(callback)
                callback(err, result)
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, lance.id);
    });
};

method.deletar = function (lance, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.deletar("Lance", db, function (err, results)
        {
            if(callback)
                callback(err, results);
            else
            {
                if(err)
                    throw err;
            }
            
        }, lance.id);
    });
};

function errorHandler(err, callback)
{
    if (callback)
        callback(err);
    else
        throw err;
}
module.exports = LanceDAO;