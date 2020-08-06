const {
    get
} = require('axios')

const URL = 'https://swapi.dev/api/people'

async function obterPessoas(nome){
    const url = `${URL}/?search=${nome}&format=json`
    const resultado = await get(url)
    return resultado.data.results.map(mapearPessoas) //pra cada item no results, me traga apenas o abaixo
}

function mapearPessoas (pessoa) { //mapear as informações do teste
    return {
        nome: pessoa.name,
        peso: pessoa.height
    }
}
module.exports = {
    obterPessoas
}