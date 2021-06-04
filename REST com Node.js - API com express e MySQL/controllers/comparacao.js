//importar
const { criarComparacao } = require('../infraestrutura/tabelas');
const produtos = require('../models/produtos');
const Produto = require('../models/produtos')

//exporta app
module.exports = app => {
    app.get('/comparacao', (req, res) => {
        produtos.lista(res);
    });

    app.get('/comparacao/:nome', (req, res) => {
        criarComparacao.buscaPorNome(nome, res);
    });

    app.post('/comparacao', (req, res) => {
        const produto = req.body;

        Produto.adiciona(produto, res);
    })

    app.patch('/comparacao/:nome', (req, res) => {
        const valores = req.body;

        Produto.altera(nome, valores, res);
    })

    app.delete('/comparacao/:nome', (req, res) => {
        Produto.deleta(nome, res);
    })
}