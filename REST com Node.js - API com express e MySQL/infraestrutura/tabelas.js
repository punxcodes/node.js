class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarComparacao();
    }

    criarComparacao() {
        const sql = `CREATE TABLE IF NOT EXIST comparacao (id int NOT NULL AUTO_INCREMENT, 
            nome varchar(50) NOT NULL, valor varchar(10), quantidade varchar(10), 
            resultado varchar(20), dataCriacao datetime NOT NULL, observacoes text, PRIMARY KEY(valor)`
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela comparacao adicionada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas