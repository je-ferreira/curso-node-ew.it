const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0] //se ele passou um valor inicial, pego ele. senão, pego array na posição 0
    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = callback(valorFinal, this[index], this) //substitui o valor final, pelo valor com incrementador
    }
    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas('a')
        const pesos = results.map(pessoa => parseInt(pessoa.height))
        console.log('pesos', pesos)
        //    const total = pesos.reduce((anterior, proximo) => {
        //         return anterior + proximo
        //    },0) //valor padrão caso não tenha peso
        const minhaLista = [
            ['Erick', 'Wendel'],
            ['NodeBR', 'Nerdzão']
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo) //pra concatenar num unico array
        },[])
        .join(', ') //pega todos os itens e separa por virgula
        console.log('total', total)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()

//OBJETIVO DO REDUCE: Reduzir a um valor final