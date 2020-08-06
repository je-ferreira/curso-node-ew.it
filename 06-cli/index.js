const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi") //criando comandos
        .option('-p, --poder [value]', "Poder do Heroi") //criando comandos
        .option('i, --id [value', "Id do Heroi")

        .option('-c --cadastrar', "Cadastrar um heroi")
        .option('-l --listar', "Lista os herois")
        .option('-r --remover', "Remove um heroi pelo id")
        .option('-a --atualizar [value]', "Atualizar um heroi pelo id")

        .parse(process.argv) //tudo o que passar de argumento, sera convertido

    const heroi = new Heroi(Commander)
    try {
        if (Commander.cadastrar) {
            delete heroi.id //se vier undefined, ele deleta e consegue cadastrar um id novo
            const resultado = await Database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi nao foi cadastrado')
                return;
            }
            console.log('Heroi cadastrado com sucesso!')
        }
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Nao foi possivel remover o heroi')
                return;
            }
            console.log('Heroi removido com sucesso')
        }
        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar) //pego o id do heroi a atualizar
            //remover todas as chaves que estiverem com undefined/null
            const dado = JSON.stringify(heroi) //transforma o objeto em string
            const heroiAtualizar = JSON.parse(dado) //a hora que transformar pra JSON de novo, ele vai gerar o id
            
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if (!resultado){
                console.error('Nao foi possivel atualizar o heroi')
                return;
            }
            console.log('Heroi atualizado com sucesso')
        }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()