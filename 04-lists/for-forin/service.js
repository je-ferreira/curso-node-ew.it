const axios = require('axios')
const URL = `https://swapi.dev/api/people`

//função que  manipulará a promise axios
async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data //retorna o objeto
}

// //exemplo chamada da função
// obterPessoas('r2')
// .then(function(resultado){ //quando chegar no resultado (parâmetro), executa esta
//     console.log('resultado', resultado)
// })
// .catch(function(error){
//     console.error('DEU RUIM', error)
// })

//transforma esse arquivo em um modulo, para que os outros arquivos possam acessar
module.exports = {
    obterPessoas
}