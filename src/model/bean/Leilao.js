var method = Leilao.prototype;

//Listagem de Atributos
this.id;
this.dono;
this.categoria;
this.descricao;
this.dataHoraInicio;
this.dataHoraFinal;
this.dataHoraExecucao;
this.endereco;
this.encerrado;
this.vencedor;
this.avaliacaoServico;

function Leilao()
{

};

//==================================SETTERS======================

method.setId = function (id)
{
    this.id = id;
};

method.setDono = function (dono)
{
    this.dono = dono;
};

method.setCategoria = function (categoria)
{
    this.categoria = categoria;
};

method.setDescricao = function (descricao)
{
    this.descricao = descricao;
};

method.setDataHoraInicio = function (dataHoraInicio)
{
    this.dataHoraInicio = dataHoraInicio;
};

method.setDataHoraFinal = function (dataHoraFinal)
{
    this.dataHoraFinal = dataHoraFinal;
};

method.setDataHoraExecucao = function (dataHoraExecucao)
{
    this.dataHoraExecucao = dataHoraExecucao;
};

method.setEndereco = function (endereco)
{
    this.endereco = endereco;
};

method.setEncerrado = function(encerrado)
{
    this.encerrado = encerrado;
}

method.setVencedor = function(vencedor)
{
    this.vencedor = vencedor;
}

method.setAvaliacaoServico = function(avaliacaoServico)
{
    this.avaliacaoServico = avaliacaoServico;
}

//==================================GETTERS======================

method.getId = function ()
{
    return this.id;
};

method.getDono = function ()
{
    return 6;
};

method.getCategoria = function ()
{
    return this.categoria;
};

method.getDescricao = function ()
{
    return this.descricao;
};

method.getDataHoraInicio = function ()
{
    return this.dataHoraInicio;
};

method.getDataHoraFinal = function ()
{
    return this.dataHoraFinal;
};

method.getDataHoraExecucao = function ()
{
    return this.dataHoraExecucao;
};

method.getEndereco = function ()
{
    return this.endereco;
};

method.getEncerrado = function()
{
    return this.encerrado;
}

method.getVencedor = function()
{
    return this.vencedor;
}

method.getAvaliacaoServico = function()
{
    return this.avaliacaoServico;
}
//================================OUTROS========================

method.popularLeilao = function (leilao)
{
    this.setId(leilao.id);
    this.setDono(leilao.dono);
    this.setCategoria(leilao.categoria);
    this.setDescricao(leilao.descricao);
    this.setDataHoraInicio(leilao.dataHoraInicio);
    this.setDataHoraFinal(leilao.dataHoraFinal);
    this.setDataHoraExecucao(leilao.dataHoraExecucao);
    this.setEndereco(leilao.endereco);
    this.setEncerrado(leilao.encerrado);
    this.setVencedor(leilao.vencedor);
    this.setAvaliacaoServico(leilao.avaliacaoServico);
};

//==================================EXPORT======================

module.exports = Leilao;