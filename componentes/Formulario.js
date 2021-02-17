import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({moneda, criptoMoneda, guardarMoneda, guardarCriptoMoneda, guardarConsultarAPI}) => {

    const [criptoMonedas, guardarCriptoMonedas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //Almacena las selecciones del usuario
    const obtenerMoneda = moneda => {
        guardarMoneda(moneda)
    }

    const obtenerCriptoMoneda = cripto => {
        guardarCriptoMoneda(cripto)
    }

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptoMoneda.trim() === '') {
            mostrarAlerta();
            return;
        }

        // Cambiar el state de consultar api
        guardarConsultarAPI(true)
  
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios', 
            [
                {text: 'OK'}
            ]
        )
    }

    return(
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                mode='dropdown'
            >
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Dolar de Estados Unidos" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptoMoneda}
                onValueChange={cripto => obtenerCriptoMoneda(cripto)}
                mode='dropdown'
            >
                <Picker.Item label="- Seleccione -" value=""/>
                { criptoMonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                ))}
            </Picker>
            
            <TouchableHighlight style={styles.btnCotizar} onPress={ () => cotizarPrecio() }>
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    );
}


const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 10
   },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});

export default Formulario;
