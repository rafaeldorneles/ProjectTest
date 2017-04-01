var method = PessoaDAO.prototype;
var Pessoa = require("./../bean/Pessoa.js");
var Conexao = require('./Conexao.js');

this.conn;
function PessoaDAO()
{
    this.conn = new Conexao();
  
}

method.cadastrar = function (pessoa, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            if(callback)
            {
                callback(err);
                return;
            }
            else
                throw err;
        }

        conn.cadastrar(pessoa, db, function (err, insertedId)
        {
            pessoa.id = insertedId + "";
            conn.editar(pessoa, db, function (err, result)
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
        if(err)
        {
            if(callback)
            {
                callback(err);
                return;
            }
            else
                throw err;
        }

        conn.buscar("Pessoa", db, function (err, pessoas)
        {
            for (var i = 0; i < pessoas.length; i++)
            {
                var p = new Pessoa();
                p.popularPessoa(pessoas[i]);
                pessoas[i] = p;
            }
            
            if(callback)
                callback(err, pessoas);
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
        if(err)
        {
            if(callback)
            {
                callback(err);
                return;
            }
            else
                throw err;
        }

        conn.buscarPorId("Pessoa", db, function (err, pessoas)
        {
            var pessoa = new Pessoa();
            pessoa.popularPessoa(pessoas[0]);

            if(callback)
                callback(err, pessoa);
            else
            {
                if(err)
                    throw err;
            }
      
            db.close();
        }, id);
        
    });
};

 method.login = function (usuario,senha,callback)
 {
     var conn = this.conn;
     conn.conectar(function(err, db)
     {
         if(err)
        {
            if(callback)
            {
                callback(err);
                return;
            }
            else
                throw err;
        }
        
         conn.buscar("Pessoa",db,function(err,pessoas)
         {
            var pessoa = new Pessoa();

			 if(pessoas[0])
            	pessoa.popularPessoa(pessoas[0]);
			 else
				 pessoa = null;

             if(callback)
                 callback(err, pessoa);
             else
             {
                 if(err)
                    throw err;
                
             }
             db.close();
         }, {username:usuario,senha:senha});
     });
 };
method.editar = function (pessoa, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            if(callback)
            {
                callback(err);
                return;
            }
            else
                throw err;
        }
        
        conn.editar(pessoa, db, function (err, result)
        {
            if(callback)
                callback(err, result);
            else
            {
                if(err)
                    throw err;
            }
            
            db.close();
        }, pessoa.id);
    });
};

method.deletar = function (pessoa, callback)
{
    var conn = this.conn;
    conn.conectar(function (err, db)
    {
        if(err)
        {
            if(callback)
            {
                callback(err);
                return;
            }
            else
                throw err;
        }
        
        conn.deletar("Pessoa", db, function (err, results)
        {
            if(callback)
                callback(err, results);
            else
            {
                if(err)
                    throw err;
            }
            
        }, pessoa.id);
    });
};

module.exports = PessoaDAO;