const assert = require('assert')
const api = require('./../api')

let app = {}

describe('Suite de Testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload) //payload é o resultado que vem (string), convert para obj javascript
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
})