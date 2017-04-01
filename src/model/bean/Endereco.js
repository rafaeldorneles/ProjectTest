var method = Endereco.prototype;

//Listagem de atributos
this.id;
this.logradouro;
this.numero;
this.complemento;
this.cep;
this.observacao;
this.cidade;
this.uf;

function Endereco()
{
	
}


//=========================================SETTERS==============================

method.setId = function(id)
{
	this.id = id;
}

method.setLogradouro = function(logradouro)
{
	this.logradouro = logradouro;
	
}

method.setNumero = function(numero)
{
	this.numero = numero;
}

method.setComplemento = function(complemento)
{
	this.complemento = complemento;
}

method.setCep = function(cep)
{
	this.cep = cep;
}

method.setObservacao = function(observacao)
{
	this.observacao = observacao;
}

method.setCidade = function(cidade)
{
	this.cidade = cidade;
}

method.setUf = function(uf)
{
	this.uf = uf;
}

//==============================================GETTERS===============================

method.getId = function()
{
	return this.id;
}

method.getLogradouro = function()
{
	return this.logradouro;
}

method.getNumero = function()
{
	return this.numero;
}

method.getComplemento = function()
{
	return this.complemento;
}

method.getCep = function()
{
	return this.cep;
}

method.getObservacao = function()
{
	return this.observacao;
}

method.getCidade = function()
{
	return this.cidade;
}

method.getUf = function()
{
	return this.uf;
}

module.exports = Endereco;