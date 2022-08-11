const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')


const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaJugadorImg = document.getElementById("mascota-jugador-img")

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanMascotaEnemigoImg = document.getElementById("mascota-enemigo-img")

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const sectionMensajes = document.getElementById('resultado')

const contenedorTajertas = document.getElementById('contenedorTarjetas')

const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputCharmander
let inputSquirtle
let inputBulbasaur
let inputPikachu
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './img/mapa.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 800

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa,id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho
        )
    }
}


let charmander = new Mokepon ('Charmander','./img/charmander.png', 5,'./img/charmander.png' )
let squirtle = new Mokepon ('Squirtle', './img/squirtle.png', 5,'./img/squirtle.png')
let bulbasaur = new Mokepon ('Bulbasaur','./img/bulbasaur.jpg',5, './img/bulbasaur.jpg')
let pikachu = new Mokepon ('Pikachu','./img/pikachu.png',5,'./img/pikachu.png')

const CHARMANDER_ATAQUES = [
    {nombre: '🔥', texto: 'FUEGO', id: 'boton-fuego'},
    {nombre: '🔥', texto: 'FUEGO', id: 'boton-fuego'},
    {nombre: '🔥', texto: 'FUEGO', id: 'boton-fuego'},
    {nombre: '💧', texto:'AGUA', id: 'boton-agua'},
    {nombre: '🌱', texto:'TIERRA', id: 'boton-tierra'},
    {nombre: '⚡',  texto:'ELECTRICIDAD', id: 'boton-electricidad'}
]

charmander.ataques.push(...CHARMANDER_ATAQUES)
// charmanderEnemigo.ataques.push(...CHARMANDER_ATAQUES)

const SQUIRTLE_ATAQUES = [    
    {nombre: '💧', texto:'AGUA', id: 'boton-agua'},
    {nombre: '💧', texto:'AGUA', id: 'boton-agua'},
    {nombre: '💧', texto:'AGUA', id: 'boton-agua'},
    {nombre: '🔥', texto: 'FUEGO', id: 'boton-fuego'},
    {nombre: '🌱', texto:'TIERRA', id: 'boton-tierra'},
    {nombre: '⚡',  texto:'ELECTRICIDAD', id: 'boton-electricidad'}
]

squirtle.ataques.push(...SQUIRTLE_ATAQUES)
// squirtleEnemigo.ataques.push(...SQUIRTLE_ATAQUES)

const BULBASAUR_ATAQUES = [
    {nombre: '🌱', texto:'TIERRA', id: 'boton-tierra'},
    {nombre: '🌱', texto:'TIERRA', id: 'boton-tierra'},
    {nombre: '🌱', texto:'TIERRA', id: 'boton-tierra'},
    {nombre: '🔥', texto: 'FUEGO', id: 'boton-fuego'},
    {nombre: '💧', texto:'AGUA', id: 'boton-agua'},
    {nombre: '⚡',  texto:'ELECTRICIDAD', id: 'boton-electricidad'}
]
bulbasaur.ataques.push(...BULBASAUR_ATAQUES)
// bulbasaurEnemigo.ataques.push(...BULBASAUR_ATAQUES)

const PIKACHU_ATAQUES = [
    {nombre: '⚡',  texto:'ELECTRICIDAD', id: 'boton-electricidad'},
    {nombre: '⚡',  texto:'ELECTRICIDAD', id: 'boton-electricidad'},
    {nombre: '⚡',  texto:'ELECTRICIDAD', id: 'boton-electricidad'},
    {nombre: '🔥', texto: 'FUEGO', id: 'boton-fuego'},
    {nombre: '💧', texto:'AGUA', id: 'boton-agua'},
    {nombre: '🌱', texto:'TIERRA', id: 'boton-tierra'}
]

pikachu.ataques.push(...PIKACHU_ATAQUES)
// pikachuEnemigo.ataques.push(...PIKACHU_ATAQUES)

mokepones.push(charmander, squirtle, bulbasaur, pikachu)


// console.log(mokepones)



function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre} /> 
        <label class="tarjeta-de-mokepon" for=${Mokepon.nombre} 
            <p>${Mokepon.nombre} </p>
            <img src=${Mokepon.foto}  alt=${Mokepon.nombre} >
        </label>
        `
        contenedorTajertas.innerHTML += opcionDeMokepones
        
        inputCharmander = document.getElementById('Charmander')
        inputSquirtle = document.getElementById('Squirtle')
        inputBulbasaur = document.getElementById('Bulbasaur')
        inputPikachu = document.getElementById('Pikachu')
    }
    )

    sectionReiniciar.style.display = 'none'
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.54.141:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {

    if (inputCharmander.checked) {
        spanMascotaJugador.innerHTML = inputCharmander.id
        mascotaJugador = inputCharmander.id
    } else if (inputSquirtle.checked) {
        spanMascotaJugador.innerHTML = inputSquirtle.id
        mascotaJugador = inputSquirtle.id
    } else if (inputBulbasaur.checked) {
        spanMascotaJugador.innerHTML = inputBulbasaur.id
        mascotaJugador = inputBulbasaur.id
    } else if (inputPikachu.checked) {
        spanMascotaJugador.innerHTML = inputPikachu.id
        mascotaJugador = inputPikachu.id
    }
    else {
        alert( "❌ ERROR - Selecciona un Pokemon ❌")
        return
    }

    sectionSeleccionarMascota.style.display  = 'none' 

    seleccionarMoquepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

}

function seleccionarMoquepon(mascotajugador){
    fetch(`http://192.168.54.141:8080/mokepon/${jugadorId}`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botonElectricidad = document.getElementById('boton-electricidad')
    botones = document.querySelectorAll('.BAtaque')
}


function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
        if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')       
                boton.style.background = '#112F58'
                boton.disabled = true

        } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')       
                boton.style.background = '#112F58'
                boton.disabled = true
        } else if (e.target.textContent === '⚡') {
            ataqueJugador.push('ELECTRICIDAD')       
            boton.style.background = '#112F58'
            boton.disabled = true
        }  else {
            ataqueJugador.push('TIERRA')       

            boton.style.background = '#112F58'
            boton.disabled = true
        }

        if (ataqueJugador.length === 6) {
            enviarAtaques()
        }
        })  
    })
}

function enviarAtaques() {
    fetch(`http://192.168.54.141:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.54.141:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
             if (res.ok) {
                res.json()
                    .then(function({ataques}) {
                        if (ataques.length === 6) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
             }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML=enemigo.nombre
    ataquesMokeponEnemigo=enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    
    for (let index = 0; index < ataquesMokeponEnemigo.length; index++) {
        const element = ataquesMokeponEnemigo[index];
        ataqueEnemigo.push(ataquesMokeponEnemigo[index].texto) 
    }
    ataqueEnemigo.sort(()=>Math.random()-0.5)
}


// function iniciarPelea() {
//     if (ataqueJugador.length === 6) {
//         ataqueAleatorioEnemigo()
//         combate()
//     }
// }

function indexAmbosOpenentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOpenentes(index, index)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[index]== 'FUEGO' && ataqueEnemigo[index] == 'TIERRA') {
            indexAmbosOpenentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index]== 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
            indexAmbosOpenentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index]== 'TIERRA' && ataqueEnemigo[index] == 'AGUA') {
            indexAmbosOpenentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index]== 'ELECTRICIDAD' && ataqueEnemigo[index] == 'AGUA') {
            indexAmbosOpenentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index]== 'ELECTRICIDAD' && ataqueEnemigo[index] == 'FUEGO') {
            indexAmbosOpenentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOpenentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }
    
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Felicitaciones, GANASTE :)')
    } else { crearMensajeFinal('Lo siento, perdiste :(')

    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}


function enviarPosicion(x, y) {
    fetch(`http://192.168.54.141:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Charmander") {
                            mokeponEnemigo = new Mokepon ('Charmander','./img/charmander.png', 5,'./img/charmander.png', enemigo.id )
                        } else if (mokeponNombre === "Squirtle") {
                            mokeponEnemigo = new Mokepon ('Squirtle', './img/squirtle.png', 5,'./img/squirtle.png', enemigo.id)
                        } else if (mokeponNombre === "Bulbasaur") {
                            mokeponEnemigo = new Mokepon ('Bulbasaur','./img/bulbasaur.jpg',5, './img/bulbasaur.jpg', enemigo.id)
                        } else if (mokeponNombre === "Pikachu") {
                            mokeponEnemigo = new Mokepon ('Pikachu','./img/pikachu.png',5,'./img/pikachu.png', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        
                        return mokeponEnemigo

                    })
                })
        }
    })
}



function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){

    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionaUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default: 
            break;
    }
}

function iniciarMapa(){

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener('keydown',sePresionaUnaTecla)

    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}


window.addEventListener('load', iniciarJuego)

