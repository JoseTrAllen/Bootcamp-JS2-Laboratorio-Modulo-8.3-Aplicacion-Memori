
import { Carta, Tablero, numeroIntentos} from "./modelo";


const generarNumeroAleatorio = (indiceDelArray: number) =>
  Math.floor(Math.random() * (indiceDelArray + 1));

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const copiaCartas = [...cartas];
  for (let indice = copiaCartas.length - 1; indice > 0; indice--) {
    let indiceAleatorio = generarNumeroAleatorio(indice);
    [{ ...copiaCartas[indice] }, { ...copiaCartas[indiceAleatorio] }] = [
      copiaCartas[indiceAleatorio],
      copiaCartas[indice],
    ];
  }
  return copiaCartas;
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
  
  if (!tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta) {
    return true;
  } else {
    return false;
  }
}

export const esVolteableLaCarta = (tablero: Tablero, indice: number): boolean => {
  return sePuedeVoltearLaCarta(tablero, indice);
} 

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada"){
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
}

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    return true;
  } else {
    return false;
  }
}

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceA].estaVuelta = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.cartas[indiceB].estaVuelta = true;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
}

export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].encontrada = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
}

export const esPartidaCompleta = (tablero: Tablero) : boolean => {
  const estanTodasLasCartasEncontradas = tablero.cartas.every((carta) => {
    if (carta.encontrada && carta.estaVuelta) {
      return true;
    } else {
      return false;
    }
  });
  return estanTodasLasCartasEncontradas;
}

export const sumarIntentos = (): number  => {
  return numeroIntentos.intentos++
}

export const iniciaPartida = (tablero: Tablero): void => {
  
  const cartasBarajadas = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida = "CeroCartasLevantadas";
  }
