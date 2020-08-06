const EventEmitter = require('events') // events é uma classe abstrata do JS

class MeuEmissor extends EventEmitter { // classe própria pra extender os métodos de events (necessário)
//se não quiser implementar nada, não precisa
}

const meuEmissor = new MeuEmissor() // manipulador de eventos
const nomeEvento = 'usuario:click' // simular que um usuário clicou
meuEmissor.on(nomeEvento, function (click) { // evento observador
    console.log('um usuario clicou', click)
})

//simular eventos acontecendo
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

// //simular loop
// let count = 0
// setInterval(function(){
//     meuEmissor.emit(nomeEvento, 'no ok' + (count ++))
// }, 1000)

//mostrar um evento acontecendo
const stdin = process.openStdin() //variavel interna do node
stdin.addListener ('data', function (value){  //listener é quem vai 'ouvir' o evento, data é do node
    console.log(`Você digitou: ${value.toString().trim()}`) //toda vez que digitar algo no terminal, ele vai mostrar
})


/*
PROMISE - Executa apenas 1 vez
EVENT - Ações contínuas
*/