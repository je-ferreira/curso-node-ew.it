const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'Flechas' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' }

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
        // await context.delete() //limpar a base antes de tudo
        await context.create(MOCK_HEROI_ATUALIZAR) //pra criar sempre um primeiro
    })
    it('PostgresSQL Connection', async function () {
        const resultado = await context.isConnected()
        assert.equal(resultado, true)
    })

    it('Cadastrar', async function () {
        const resultado = await context.create(MOCK_HEROI_CADASTRAR)
        // console.log('resultado', resultado)
        delete resultado.id //o id é irrelevante nesse momento
        assert.deepEqual(resultado, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async function () {
        const [resultado] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome }) //listar pelo nome
        delete resultado.id //o id é irrelevante nesse momento
        assert.deepEqual(resultado, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha', //vai substituir o campo original por este
        }
        const [resultado] = await context.update(itemAtualizar.id, novoItem) //objeto a atualizar e objeto com novos itens
        assert.deepEqual(resultado, 1) //se o resultado for 1, é porque atualizou

        const [itemAtualizado] = await context.read( { id: itemAtualizar.id}) //não é uma boa pratica ter 2
        assert.deepEqual(itemAtualizado.nome, novoItem.nome) //não é uma boa pratica ter 2
        /*
        No JavaScript temos uma tecnica chamada rest/spread que é um metodo usado pra mergear objetos ou separa-los

        {
            nome: 'Batman',
            poder: 'Dinheiro,
        }

        {
            dataNascimento: '1993-07-12'
        }

        final:
        {
            nome: 'Batman',
            poder: 'Dinheiro, 
            dataNascimento: '1993-07-12'
        }

        Usando os 3 pontos na frente, ele pega todas as chaves do primeiro objeto
        e coloca no mesmo nível do segundo objeto
         */
    })

    it('Remover por ID', async function () {
        const [item] = await context.read({}) //pega qualquer um
        const resultado = await context.delete(item.id)
        assert.deepEqual(resultado, 1)
    })
})