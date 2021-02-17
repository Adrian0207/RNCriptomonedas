import React, {useState, useEffect} from 'react';
import {  StyleSheet,  ScrollView,  View, ActivityIndicator, Image} from 'react-native';
import Header from './componentes/Header'
import Formulario from './componentes/Formulario'
import Cotizacion from './componentes/Cotizacion'
import axios from 'axios';

const App = () => {
  
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect( () => {
    const cotizarCriptoMoneda = async () => {
      if(consultarAPI){
        // consultar la api para obtener la cotización
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        
        guardarCargando(true);

        //Ocultar el spinner y mostrar el resultado
        setTimeout( () => {
          guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          guardarConsultarAPI(false);
          guardarCargando(false);
        }, 3000)


      }
    }
    cotizarCriptoMoneda();
  }, [consultarAPI]);

  //Mostar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size="large" color='#5e49e2' /> : <Cotizacion resultado={resultado}/>

  return (
    <>
    <ScrollView>

      <Header/>

      <Image 
        style={styles.imagen}
        source={ require('./assets/img/cryptomonedas.png')}
      />

      <View style={styles.contenido}>
        <Formulario 
          moneda={moneda}
          criptoMoneda={criptoMoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        {componente}
      </View>


    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width: '100%',
    height: 120,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
