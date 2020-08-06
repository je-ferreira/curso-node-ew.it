const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database') //import do database

const DEFAULT_ITEM_CADASTRAR = { //variavel global
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = { //variavel global
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Suite de manipulação de Heróis', () => {
    before(async () => { //antes de tudo, cadastra o default pro listar funcionar mesmo sem nenhum arquivo
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR //resultado esperado
        const [resultado] = await database.listar(expected.id)
        // const posicaoUm = resultado[0] //a chave acima tira a necessidade dessa declaração, sempre vai puxar a primeira posicao
        // ok(resultado, expected) //o primeiro parametro do 'ok' só verifica se tem valor ou não (true/false), então mesmo q eu não passe nada no 'listar' ele aceita
        deepEqual(resultado, expected) //valida a saida, comparando exatamente com o esperado
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR) //a variavel diretamente porque o 'cadastrar' passado aqui poderia ser outra coisa
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id) //pega o que foi cadastrado e verifica se o id tá no arquivo (confirmar cadastro), se estiver pega a primeira posição (chaves utilizadas)
        deepEqual(actual, expected)
    })

    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR, //pegue todos os dados de atualizar e substitua pelos abaixo
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado) //quem atualizo e por quem (sem o id)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id) //pego da listagem o heroi atualizado
        deepEqual(resultado, expected)

    })
})