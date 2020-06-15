import React,{useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    cursor:pointer;
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo:'USD', nombre:'Dolar de Estado Unidos'},
        {codigo:'MXN', nombre:'Peso Mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra Esterlina'}
    ]
    // utilizar useMoneda
        const [moneda, SelectMoneda] = useMoneda('Elige tu moneda','',MONEDAS);

    // utilizar useCriptomoneda
        const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda','',listacripto);
    
    useEffect(()=>{
    
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            
            guardarCriptomonedas(resultado.data.Data)                
            // console.log(resultado.data.Data)
        }
        consultarAPI();
    }, []);
    
    // cuando se hace el submit

    const cotizarMoneda = e =>{
        e.preventDefault();
        // valir que ambos campos esten llenos
        if(moneda ==='' || criptomoneda===''){
            guardarError(true);
            return;
        }

        // pasar los datos al componente ppal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }
    return ( 
        <form onSubmit={cotizarMoneda}>
            {error? 
                <Error
                    mensaje="Todos los campos son obligatorios"
                />
            : null}
            <SelectMoneda/>

            <SelectCripto/>
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;