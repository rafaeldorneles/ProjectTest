var method = EnderecoDAO.prototype;
var Endereco = require('./../bean/Endereco');
var Conexao = require('./Conexao');

this.conn;
function EnderecoDAO()
{
    this.conn = new Conexao();
}

method.cadastrar = function (endereco, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if (err)
        {
            errorHandler(err, callback);
            return;
        }

        conn.cadastrar(endereco, db, function (err, insertedId)
        {
            conn.editar(endereco, db, function (err, result)
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

        conn.buscar("Endereco", db, function (err, enderecos)
        {
            for (var i = 0; i < enderecos.length; i++)
            {
                var e = new Endereco();
                e.popularEndereco(enderecos[i]);
                enderecos[i] = e;
            }
            
            if(callback)
                callback(err, enderecos);
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

        conn.buscarPorId("Endereco", db, function (err, enderecos)
        {
            var endereco = new Endereco();
            endereco.popularEndereco(enderecos[0]);

            if(callback)
                callback(err, endereco);
            else
            {
                if(err)
                    throw err;
            }
      
            db.close();
        }, id);
        
    });
};

method.editar = function (endereco, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.editar(endereco, db, function (err, result)
        {
            if(callback)
                callback(err, result)
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, endereco.id);
    });
};

method.deletar = function (endereco, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            errorHandler(err, callback);
            return;
        }
        
        conn.deletar("Endereco", db, function (err, results)
        {
            if(callback)
                callback(err, results);
            else
            {
                if(err)
                    throw err;
            }
            
        }, endereco.id);
    });
};

function errorHandler(err, callback)
{
    if (callback)
        callback(err);
    else
        throw err;
}

module.exports = EnderecoDAO;