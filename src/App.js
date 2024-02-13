import React, { Component } from 'react';
import './App.css';
import ManoComponent from './ManoComponent';
import BotonComponent from './BotonComponent';

const deckInicial = [ 
    { name: "2_of_hearts.png", value: 2 },
    { name: "3_of_hearts.png", value: 3 },
    { name: "4_of_hearts.png", value: 4 },
    { name: "5_of_hearts.png", value: 5 },
    { name: "6_of_hearts.png", value: 6 },
    { name: "7_of_hearts.png", value: 7 },
    { name: "8_of_hearts.png", value: 8 },
    { name: "9_of_hearts.png", value: 9 },
    { name: "10_of_hearts.png", value: 10 },
    { name: "jack_of_hearts2.png", value: 10 },
    { name: "queen_of_hearts2.png", value: 10 },
    { name: "king_of_hearts2.png", value: 10 },
    { name: "A_of_hearts.png", value: 11 },
    { name: "2_of_diamonds.png", value: 2 },
    { name: "3_of_diamonds.png", value: 3 },
    { name: "4_of_diamonds.png", value: 4 },
    { name: "5_of_diamonds.png", value: 5 },
    { name: "6_of_diamonds.png", value: 6 },
    { name: "7_of_diamonds.png", value: 7 },
    { name: "8_of_diamonds.png", value: 8 },
    { name: "9_of_diamonds.png", value: 9 },
    { name: "10_of_diamonds.png", value: 10 },
    { name: "jack_of_diamonds2.png", value: 10 },
    { name: "queen_of_diamonds2.png", value: 10 },
    { name: "king_of_diamonds2.png", value: 10 },
    { name: "A_of_diamonds.png", value: 11 },
    { name: "2_of_clubs.png", value: 2 },
    { name: "3_of_clubs.png", value: 3 },
    { name: "4_of_clubs.png", value: 4 },
    { name: "5_of_clubs.png", value: 5 },
    { name: "6_of_clubs.png", value: 6 },
    { name: "7_of_clubs.png", value: 7 },
    { name: "8_of_clubs.png", value: 8 },
    { name: "9_of_clubs.png", value: 9 },
    { name: "10_of_clubs.png", value: 10 },
    { name: "jack_of_clubs2.png", value: 10 },
    { name: "queen_of_clubs2.png", value: 10 },
    { name: "king_of_clubs2.png", value: 10 },
    { name: "A_of_clubs.png", value: 11 },
    { name: "2_of_spades.png", value: 2 },
    { name: "3_of_spades.png", value: 3 },
    { name: "4_of_spades.png", value: 4 },
    { name: "5_of_spades.png", value: 5 },
    { name: "6_of_spades.png", value: 6 },
    { name: "7_of_spades.png", value: 7 },
    { name: "8_of_spades.png", value: 8 },
    { name: "9_of_spades.png", value: 9 },
    { name: "10_of_spades.png", value: 10 },
    { name: "jack_of_spades2.png", value: 10 },
    { name: "queen_of_spades2.png", value: 10 },
    { name: "king_of_spades2.png", value: 10 },
    { name: "A_of_spades.png", value: 11 }
  ];
  function shuffleDeck(deck) {
    // Crea una copia del deck para evitar perder el deck original
    const shuffledDeck = [...deck];
  
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
  
    return shuffledDeck;
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadorcartas: [],
      crupiercartas: [],
      cartarobada: [],
      mostrarcartaoculta: false,
      shuffleDeck: [],
      puntuacionjugador: 0,
      puntuacioncrupier: 0,
      nuevaronda: false,
    };
    this.nuevaronda = this.nuevaronda.bind(this);
    this.robarcarta = this.robarcarta.bind(this);
    this.robarcrupier = this.robarcrupier.bind(this);
    this.plantarse = this.plantarse.bind(this);
  }

  componentDidMount() {
    this.nuevaronda();
  }

  nuevaronda() {

    //Baraja el deck 
    const baraja = shuffleDeck([...deckInicial])
    //actualiza el estado de la baraja
    this.setState({shuffledDeck: baraja})
    //actualiza al estado de nueva ronda para que se oculte
    this.setState({nuevaronda: false})

    //Estado del jugador
    //Roba carta del jugador
    const manoinicialjugador = [baraja.pop()]
    //Actuliza el estado de las cartas del jugador
    this.setState ({jugadorcartas: manoinicialjugador})
    //Llama a la funcion que actualiza la puntuacion del jugador
    this.calcularpuntuacionjugador(manoinicialjugador)

    const manoinicialcrupier = [baraja.pop(), { name: 'back.png', value: 0}]
    //Actuliza el estado de las cartas del crupier
    this.setState ({crupiercartas: manoinicialcrupier})
    //Llama a la funcion que actualiza la puntuacion del crupier
    this.calcularpuntuacioncrupier(manoinicialcrupier)
  }
  calcularpuntuacion (cartas) {
    return cartas.reduce((total, carta) => total + carta.value, 0);
  }
  calcularpuntuacioncrupier (cartas) {
    //llama a la funcion que calcula la puntuacion le paso por parametro las cartas del crupier
    const puntuacion = this.calcularpuntuacion(cartas)
    //actualiza estado con la puntuacion nueva
    this.setState({puntuacioncrupier : puntuacion})
    // si se pasa de 21 muestra lo de nueva ronda
    if (puntuacion > 21){
        this.setState({nuevaronda: true})
    }
  } 
  
  calcularpuntuacionjugador (cartas) {
  //llama a la funcion que calcula la puntuacion le paso por parametro las cartas del jugador
    const puntuacion = this.calcularpuntuacion(cartas)
  //actualiza estado con la puntuacion nueva
    this.setState({puntuacionjugador : puntuacion})
  // si se pasa muestra lo de nueva ronda
    if (puntuacion > 21){
        this.setState({nuevaronda: true})
    }
  } 
  calcularganador () {
    if (this.state.puntuacionjugador <= 21 && this.state.puntuacioncrupier > 21) {
      return "Has ganado";
    } else if (this.state.puntuacioncrupier <= 21 && this.state.puntuacionjugador > 21) {
      return "Ha ganado el Crupier"
    } else {
      if (this.state.puntuacioncrupier === this.state.puntuacionjugador) {
        return "Empate"
      } else if (this.state.puntuacioncrupier > this.state.puntuacionjugador) {
        return "Ha ganado el Crupier"
      } else {
        return "Has ganado"
      }
    }
}

  robarcarta () {
    const carta = this.state.shuffledDeck.pop();
    this.setState({ cartarobada: carta})
    this.setState({ jugadorcartas: [...this.state.jugadorcartas, carta] }, () => {
      // Llama a calcularpuntuacionjugador después de que se haya actualizado el estado
      this.calcularpuntuacionjugador([...this.state.jugadorcartas]);
    });
  }
  
  robarcrupier () {
    const carta = this.state.shuffledDeck.pop();
    this.setState({ cartarobada: carta})
    this.setState({ crupiercartas: [...this.state.crupiercartas, carta] }, () => {
      // Llama a calcularpuntuacioncrupier después de que se haya actualizado el estado
      this.calcularpuntuacioncrupier([...this.state.crupiercartas]);
    });
  }
  

  plantarse () {
    this.setState({mostrarcartaoculta: true})
    let manocrupier = [...this.state.crupiercartas]
    if (manocrupier.some(carta => carta.value === 0)){
      //Elimina la carta oculta de la mano del crupier 
      manocrupier = manocrupier.slice(0,1).concat(manocrupier.slice(2))
      //Saca una nueva carta en su lugar
      const carta = this.state.shuffledDeck.pop()
      manocrupier = [...manocrupier, carta]
    }
    while (this.calcularpuntuacion(manocrupier) < 17 ){
      const carta = this.state.shuffledDeck.pop()
      manocrupier = [...manocrupier, carta]
    }

    this.setState({crupiercartas: manocrupier })
    this.calcularpuntuacioncrupier(manocrupier)
    this.setState({nuevaronda: true})
  }

render(){

  const {nuevaronda} = this.state;
  const ganador = this.calcularganador()
  return ( 
    <div>
      <div className='fondo'>
        <h1 className="titulo">Blackjack</h1>
      </div>
      <div id="juego">
        <div id="tablero">
        {nuevaronda && (
          <div id="nuevaronda">
            <h1>{ganador}</h1>
            <BotonComponent onClick={this.nuevaronda} texto="Nueva Ronda" />
          </div>
        )}
        <div id="manocrupier">
          <h1>Puntuacion Crupier: {this.state.puntuacioncrupier}</h1>
          <ManoComponent cartas={this.state.crupiercartas} />
        </div>
        <div id="botoncrupier">
          <BotonComponent onClick={this.robarcrupier} texto="Robar" />
        </div>
        <div id="manojugador">
          <h1>Puntuacion jugador: {this.state.puntuacionjugador}</h1>
          <ManoComponent cartas={this.state.jugadorcartas} />
        </div>
        <div id="botonjugador">
          <BotonComponent onClick={this.robarcarta} texto="Robar" />
          <BotonComponent onClick={this.plantarse} texto="Plantarse" />
        </div>
      </div>
    </div>
    </div>
  );
}
}
    
export default App;
