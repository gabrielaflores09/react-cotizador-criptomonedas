import React,{useState, useEffect} from 'react';
import styled from '@emotion/styled';
// import imagen from './images/cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
const Contenedor =  styled.div`
  max-width: 900px;
  margin: 0px auto ;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

// const Imagen =  styled.img`
//   max-width: 100%;
//   margin-top: 5rem;
// `;

const Heading =  styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size:35px;
  margin-bottom: 40px;
  margin-top:40px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda]= useState('');
  const [criptomoneda, guardarCriptomoneda]=useState('');
  const [cotizacion, guardarCotizacion]= useState({});
  const [cargando, continuarGuardando]= useState(false);

  useEffect(()=>{

    const cotizarCriptomoneda = async () =>{
      // Evitamos la ejecución la primera vez
      if(moneda ==='') return;
    
      // consultar la API para obtener la cotización
      const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      
      const resultado = await axios.get(url);

      // Mostrar spinner
      continuarGuardando(true);
      // ocultar el spinner y mostrar resultado
      setTimeout(()=>{
        // Cambiar el estado de cargando
        continuarGuardando(false);

        guardarCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000)
      
    }
    cotizarCriptomoneda();
    
  },[moneda, criptomoneda]);

  // const cotiza= Object.keys(cotizacion).length===0 ? null: <Cotizacion cotizacion={cotizacion}/>;
  
  // Mostrar spinner o resultado
  const componente = (cargando)? <Spinner/> : <Cotizacion cotizacion={cotizacion}/>
  return (
    <Contenedor>
      <div>
        {/* <Imagen
          src={imagen}
          alt="imagen cripto"
        /> */}
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
