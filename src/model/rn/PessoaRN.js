var method = PessoaRN.prototype;
var ErrorGenerator = require("./../../util/ErrorGenerator");
var isValidDate = require("./../../util/isValidDate");
var SessionManager = require("./../../util/SessionManager");

this.errorGenerator;
 
 function PessoaRN()
 {
    this.errorGenerator = new ErrorGenerator();
 }
 
 method.cadastrar = function (pessoa, dao,callback)
 {
	 if (isNull(pessoa, callback, this.errorGenerator))
		 return;

	 if (!isNumber(pessoa, callback, this.errorGenerator))
		 return;

    
    dao.cadastrar(pessoa, function (err, dbResponse)
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

method.login = function (session, dao, pessoa, callback)
{
    dao.login(pessoa.username,pessoa.senha, function (err, pessoa)
    {
		var sessionManager = new SessionManager();
		sessionManager.logar(session, pessoa);

        if (callback)
		{
			if(pessoa)
				callback(err, true);
			else
				callback(err, false);
		}
        else {
            if (err)
                throw err;
        }
    });
    
};

method.buscar = function (dao, pessoa, callback)
{

   
    dao.buscar(pessoa.id, function (err, pessoa)
    {
        if (callback)
            callback(err, pessoa);
        else
        if (err)
            throw err;
    });
};

method.deletar = function (pessoa, dao, callback)
{
    dao.deletar(pessoa, function (err, dbResponse)
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

method.editar = function (pessoa, dao, callback)
{
    
    if (isNull(pessoa, callback, this.errorGenerator))
        return;

    
    if (!isNumber(pessoa, callback, this.errorGenerator))
        return;
    //if (!isDate(pessoa, callback, this.errorGenerator))
      //  return;
   
   dao.editar(pessoa, function (err, dbResponse)
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

function isNumber(pessoa, callback, errorGenerator)
{
    if (isNaN(pessoa.getCpf()) && isNaN(pessoa.getCnpj()))
    {
        errorGenerator.getNumberFieldError("cpf", callback);
        return false;
    }

    if (isNaN(pessoa.getTelefones()))
    {
        errorGenerator.getNumberFieldError("telefones", callback);
        return false;
    }
    

    return true;
}

function isNull(pessoa, callback, errorGenerator)
{
    if (pessoa.getNome() == null)
    {
        errorGenerator.getNullFieldError("nome", callback);
        return true;
    }


    if (pessoa.getUsername() == null)
    {
        errorGenerator.getNullFieldError("username", callback);
        return true;
    }

    if (pessoa.getSenha() == null)
    {
        errorGenerator.getNullFieldError("senha", callback);
        return true;
    }

    if (pessoa.getEmail() == null)
    {
        errorGenerator.getNullFieldError("email", callback);
        return true;
    }

    if (pessoa.getTelefones() == null)
    {
        errorGenerator.getNullFieldError("telefones", callback);
        return true;
    }

    return false;
}

function isDate(pessoa, callback, errorGenerator)
{
    if (!isValidDate(pessoa.getDataNascimento()))
    {
        errorGenerator.getDateFieldError("dataNascimento", callback);
        return false;
    }

    return true;
}

module.exports = PessoaRN;
