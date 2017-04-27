var method = Avaliacao.prototype;

//Listagem de Atributo
this.nota;
this.descricao;
this.avaliado;

function Avaliacao()
{
	
}

//================================SETTERS============================

method.setId = function(id)
{
	this.id = id;
};

method.setNota = function(nota)
{
	this.nota = nota;
};

method.setDescricao = function(descricao)
{
	this.descricao = descricao;
};


method.setAvaliado = function(avaliado)
{
	this.avaliado = avaliado;
};
//=========================================GETTERS===========================

method.getId = function()
{
	return this.id;
};

method.getDescricao = function()
{
	return this.descricao;
};

method.getNota = function()
{
	return this.nota;
};

method.getAvaliado = function()
{
	return this.avaliado;
};

//=====================================OUTROS=================================

method.popularAvaliacao = function(avaliacao)
{
    this.setId(avaliacao._id);
    this.setNota(avaliacao.nota);
    this.setDescricao(avaliacao.descricao);
    this.setAvaliado(avaliacao.avaliado);
};

module.exports = Avaliacao;