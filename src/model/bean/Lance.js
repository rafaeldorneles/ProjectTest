var method = Lance.prototype;

//Listagem de Atributo
this.id;
this.valor;
this.interessado;
this.leilao;
this.dataHora;

function Lance()
{
	
}

//================================SETTERS============================

method.setId = function(id)
{
	this.id = id;
}

method.setValor = function(valor)
{
	this.valor = valor;
}

method.setInteressado = function(interessado)
{
	this.interessado = interessado;
	
}

method.setLeilao = function(leilao)
{
	this.leilao = leilao;
}

method.setDataHora = function (dataHora)
{
    this.dataHora = dataHora;
};

//=========================================GETTERS===========================

method.getId = function()
{
	return this.id;
}

method.getValor = function()
{
	return this.valor;
}

method.getInteressado = function()
{
	return this.interessado;
}

method.getLeilao = function()
{
	return this.leilao;
}

method.getDataHora = function ()
{
    return this.dataHora;
};
//=====================================OUTROS=================================

method.popularLance = function(lance)
{
    this.setId(lance.id);
    this.setInteressado(lance.interessado);
    this.setValor(lance.valor);
    this.setLeilao(lance.leilao);
    this.setDataHora(lance.datahora);
};

module.exports = Lance;