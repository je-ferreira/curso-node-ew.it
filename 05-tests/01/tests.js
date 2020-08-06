const assert = require('assert')
const { obterPessoas } = require('./service')

// instalamos o pacote nock, para simular requisicoes
const nock = require('nock')


describe('Star Wars Teste', function () { //suite de testes
    this.beforeAll(() => { //antes de tudo, faça este
        const response = { //pra não ter que bater no serviço toda hora, ja sei que este é o resultado
            count: 1,
            next: null,
            previous: null,
            results:
                [{
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'http://swapi.dev/api/planets/8/',
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'http://swapi.dev/api/people/3/'
                }]
        }
        nock('https://swapi.dev/api/people') //quando tentar acessar essa url...
        .get('/?search=r2-d2&format=json') //...com esses parametros...
        .reply(200, response) //... responda com status 200 e o response criado
    })

    it('deve buscar o r2d2 com o formato correto', async () => { //nome do teste
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }]
        const nomeBase = 'r2-d2' //pra pesquisa
        const resultado = await obterPessoas(nomeBase)
        assert.deepEqual(resultado, expected)
    })
}) 