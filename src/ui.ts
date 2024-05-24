import { tablero, Tablero, numeroIntentos } from "./modelo";
import { iniciaPartida, esVolteableLaCarta, voltearLaCarta, sonPareja, parejaEncontrada, parejaNoEncontrada, esPartidaCompleta, sumarIntentos} from "./motor";

export const crearTablero = () => {
  generarTablero();
}

const generarTablero = () => {
  for(let i = 0; i < tablero.cartas.length; i++) {
    mapearDivsACartas(i);
  }
}

const mapearDivsACartas = (indiceArray: number) => {
  const dataIndiceId = `div[data-indice-id="${indiceArray}"]`;
  const elementoDiv = document.querySelector(dataIndiceId);
  
  if (elementoDiv !== undefined && elementoDiv !== null) {
    elementoDiv.addEventListener("click", () => {
      if(tablero.estadoPartida !== "PartidaNoIniciada") {
        pintarImagen(indiceArray, tablero); 
      }
    } )
  }
}

const pintarImagen = (indiceArray: number, tablero: Tablero) => {
  setTimeout(() => {
    if (esVolteableLaCarta(tablero, indiceArray)) {
      voltearLaCarta(tablero, indiceArray);
      const dataIndiceId = `img[data-indice-id="${indiceArray}"]`;
      const elementoImg = document.querySelector(dataIndiceId);
      if (elementoImg !== null && elementoImg !== undefined && elementoImg instanceof HTMLImageElement) {
        elementoImg.src = tablero.cartas[indiceArray].imagen;
        elementoImg.style.backgroundColor = "rgb(184, 0, 172)";
        mirarSiEsLaSegundaCarta(tablero)
      }
    } else {
      mensajeCartaVolteada();
    }
  }, 500);
}

const mirarSiEsLaSegundaCarta = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA !== undefined && indiceB !== undefined) {
    if (sonPareja(indiceA, indiceB, tablero)){
      encontradaPareja(tablero, indiceA, indiceB);
    } else {
      noEncontradaPareja(tablero, indiceA, indiceB);
    }
  }
}

const clickBotonEmpezarPartida = () => {
  iniciaPartida(tablero);
}

export const agregarEventoBotonIniciarPartida = () => {
  const boton = document.getElementById("boton-empezar-partida");
  if (boton !== null && boton !== undefined && boton instanceof HTMLButtonElement) {
    boton.addEventListener("click", () => {
      clickBotonEmpezarPartida();
      mostrarIntentos();
      estiloCarta();
      eliminarBotonEmpezarPartida(boton);
    })
  }
}

const encontradaPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
  parejaEncontrada(tablero,indiceA,indiceB);
  if (esPartidaCompleta(tablero)) {
    console.log("Todas las parejas encontradas");
    mensajePartidaGanada();
  }
  mostrarIntentos();
}

const noEncontradaPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
  parejaNoEncontrada(tablero, indiceA, indiceB);
  setTimeout(() => {
    ponerImagenBocaAbajo()
  }, 1000);
  mostrarIntentos();
}

const ponerImagenBocaAbajo = () => {
  for ( let i = 0; i < tablero.cartas.length; i++) {
    if (!tablero.cartas[i].encontrada && !tablero.cartas[i].estaVuelta) {
      darleLaVueltaALaCarta(i);
    }
  }
}

const darleLaVueltaALaCarta = (indice: number) => {
  const dataIndiceId = `img[data-indice-id="${indice}"]`;
  const elementoImg = document.querySelector(dataIndiceId);
  
  if (elementoImg !== null && elementoImg !== undefined && elementoImg instanceof HTMLImageElement) {
    elementoImg.src = "";
  }
}

export const mostrarIntentos = () => {
  const intentosTexto = document.querySelector(".intentos-parrafo");
  if (intentosTexto !== undefined && intentosTexto !== null && intentosTexto instanceof HTMLParagraphElement) {
    intentosTexto.innerText = `Intentos: ${numeroIntentos.intentos}`;
  }
  sumarIntentos();
}

const estiloCarta = () => {
  const cartaEstilo = document.querySelectorAll(".carta")

  if (cartaEstilo !== undefined && cartaEstilo !== null && cartaEstilo) {
    cartaEstilo.forEach(carta => {
      if (carta instanceof HTMLDivElement) {
        carta.style.cursor = "pointer";
        carta.addEventListener("click", () => {
          carta.style.transform = "rotateY(180deg)";
          carta.style.transition = "transform 1s"
        })
        carta.addEventListener("mouseover", () => {
          carta.style.backgroundColor = "purple"
        })
        carta.addEventListener("mouseout", () => {
          carta.style.backgroundColor = "";
        })
      }
    })
  }
}

const eliminarBotonEmpezarPartida = (boton: HTMLButtonElement) => {
  return boton.remove();
}

const mensajeCartaVolteada = () => {
  const mensaje = document.getElementById("mensaje-carta");
  if (mensaje !== undefined && mensaje !== null && mensaje instanceof HTMLParagraphElement) {
    mensaje.innerText = "¡Esa carta ya está volteada! Prueba con otra";
    setTimeout(() => {
      mensaje.innerText = "";
    }, 2000);
  } 
  if (esPartidaCompleta(tablero)) {
    if (mensaje !== undefined && mensaje !== null && mensaje instanceof HTMLParagraphElement) {
      mensaje.innerText = ""
    }
  }
}

const mensajePartidaGanada = () => {
  const mensajeGanar = document.getElementById("mensaje-ganar")
  if(mensajeGanar !== null && mensajeGanar !== undefined && mensajeGanar instanceof HTMLParagraphElement) {
    mensajeGanar.innerText = "¡¡¡Has ganado!!!";
  } 
}

