const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Produto {
    adiciona(produto, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        //validação dos inputs
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const produtoValido = produto.nome.lenght >= 1;

        const validacoes = [{
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'nome',
                valido: produtoValido,
                mensagem: 'Digite o nome do produto'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length;

        const produtoDatado = {...produto, dataCriacao, data }
        const sql = `INSERT INTO comparacao SET ?`;

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            conexao.query(sql, produtoDatado, (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(produto);
                }
            })
        }
    }

    lista(res) {
        const sql = `SELECT * FROM comparacao`
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorNome(nome, res) {
        const sql = `SELECT * FROM comparacao WHERE nome=${nome}`
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    altera(nome, valores, res) {
        if (valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = `UPDATE comparacao SET ? WHERE nome=?`
        conexao.query(sql, [valores, nome], (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(...valores, nome);
            }
        })
    }

    deleta(nome, res) {
        const sql = `DELETE FROM comparacao WHERE nome=?`

        conexao.query(sql, id, (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ nome });
            }
        })
    }
}

module.exports = new Produto;