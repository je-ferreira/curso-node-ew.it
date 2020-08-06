/*
0 Obter um usuario
1 Obter um numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/

// módulo interno do node.js pra conversão de callback em promise
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    //quando der algum problema -> reject
    //quando sucess -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            // return reject (new Error('DEU RUIM DE VERDADE!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos Bobos',
            numero: 0
        })
    }, 2000);

}

//COM PROMISE, ASYNC E AWAIT

// 1º passo: adicionar a palavra async -> automaticamente ela retornará uma Promise
main() //pra executar, precisa chamar a função criada abaixo (como eu não quero fazer nada após ele, não preciso de .then nem .catch)
async function main(){ //poderia ser outro nome de função, colocado main apenas para representar que é o principal
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        /*o endereço n depende da resolução do telefone, não tem porque esperar,
        o 'await promise.all' vai fazer rodarem em segundo plano assincronamente, pra melhoria da performance 
        (neste exemplo, diminuiu 2seg*/
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado [0]
        const endereco = resultado [1]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: Rua ${endereco.rua}, nº ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }
    catch (error) {
        console.error('DEU RUIM', error)
    }
}

//COM PROMISE APENAS
// const usuarioPromise = obterUsuario()
// // para manipular o sucesso, usamos a função .then
// // para manipular erro, usamos o .catch
// // usuário -> telefone -> telefone
// usuarioPromise
//     .then(function (usuario) { //o que virá do usuário, é passado aqui pelo 'usuario'
//         return obterTelefone(usuario.id) //se retornar a promise direto, vai retornar só telefone
//             .then(function resolverTelefone(result) { //pra proxima função levar o resultado desta função
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) { //o 'resultado' traz o retorno da then anterior (usuario e telefone)
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco //se retornar a promise direto, vai retornar só endereco
//             .then(function resolverEndereco(result) { //pra proxima função levar o resultado desta função
//                 return {
//                     usuario: resultado.usuario,
//                     telefone: resultado.telefone,
//                     endereco: result
//                 }
//             });
//     })
//     .then(function (resultado) { //traz as informaçoes reunidas nas funcoes anteriores
//         console.log(`
//         Nome: ${resultado.usuario.nome}
//         Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         Endereço: Rua ${resultado.endereco.rua}, nº ${resultado.endereco.numero}
//         `)
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM', error)
//     })

//COM CALLBACK
// obterUsuario(function resolverUsuario(error, usuario) {
//     if (error) {
//         console.error('DEU RUIM em USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error1)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('DEU RUIM em ENDERECO', error2)
//                 return;
//             }

//             console.log(`
//             Nome: ${usuario.nome}
//             Endereco: Rua ${endereco.rua}, ${endereco.numero}
//             Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })
// })