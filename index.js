class RuletaMagica{
  constructor(min = 1, max = 6){
    this.min = min
    this.max = max
  }

  girar(){
    let {max, min} = this
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
class CasillaEspecial{
  constructor(base, movimiento = 0, tipo = 1){
    this.base = base
    this.movimiento = base + movimiento
    this.tipo = tipo ? 'Serpiente' : 'Escalera'
  }
}
class Ficha{
  constructor(nombre, posicion = 0){
    this.nombre = nombre
    this.posicion = posicion
  }
  moverFicha(movimiento){
    if(movimiento >= 0){
      this.posicion = movimiento
    }else{
      this.posicion = 0
    }
  }
}
class Tablero{
  camino = null
  constructor(longitud = 100,num_escaleras = 8, num_serpientes = 8){
    this.longitud = longitud
    this.num_escaleras = num_escaleras
    this.num_serpientes = num_serpientes
    this._generarTablero()
  }

  _generarTablero(){
    let { longitud, num_escaleras, num_serpientes, camino } = this
    this.camino = new Array(longitud)
    let ruletaObstaculos = new RuletaMagica(1,100)
    let posicion = null
    for(let i = 0; i < num_escaleras; i++){
      posicion = ruletaObstaculos.girar()
      if(this.camino[posicion]){
        while(!this.camino[posicion]){
          posicion = ruletaObstaculos.girar()
          this.camino[posicion] = new CasillaEspecial(posicion,3,0)
        }
      }else{
        this.camino[posicion] = new CasillaEspecial(posicion,3,0)
      }
    }
    for(let i = 0; i < num_serpientes; i++){
      posicion = ruletaObstaculos.girar()
      if(this.camino[posicion]){
        while(!this.camino[posicion]){
          posicion = ruletaObstaculos.girar()
          this.camino[posicion] = new CasillaEspecial(posicion,-3,1)
        }
      }else{
        this.camino[posicion] = new CasillaEspecial(posicion,-3,1)
      }
    }
    console.log(this.camino)
  }
  empezarJuego(){
    let ganador = null
    let { camino } = this
    let ruletaTurnos = new RuletaMagica()
    let jugadorA = new Ficha('Jugador A')
    let jugadorB = new Ficha('Jugador B')
    let nuevaPosicion, casilla
    while(!ganador){
      // JUGADOR 1
      nuevaPosicion = jugadorA.posicion + ruletaTurnos.girar()
      casilla = this.camino[nuevaPosicion]
      if(casilla){
        jugadorA.moverFicha(casilla.movimiento)
      }else{
        jugadorA.moverFicha(nuevaPosicion)
      }
      if(jugadorA.posicion >= 100) ganador = `Ha ganado el jugador ${jugadorA.nombre}`

      // JUGADOR 2
      nuevaPosicion = jugadorB.posicion + ruletaTurnos.girar()
      casilla = this.camino[nuevaPosicion]
      if(casilla){
        jugadorB.moverFicha(casilla.movimiento)
      }else{
        jugadorB.moverFicha(nuevaPosicion)
      }
      if(jugadorB.posicion >= 100 && !ganador) ganador = `Ha ganado el jugador ${jugadorB.nombre}`

      // Pasos
      console.log(`Jugador A posicion: ${jugadorA.posicion}`)
      console.log(`Jugador B posicion: ${jugadorB.posicion}`)
    }
    console.log(ganador)
  }
}

let partida = new Tablero(100).empezarJuego()
