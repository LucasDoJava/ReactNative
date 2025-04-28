import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ConsultaProps = {
    animal: string;
    horaEntrada: string;
    horaSaida: string;
    diagnostico: string;
    valorConsulta: number;
    };

    export default function Consulta({animal, horaEntrada, horaSaida, diagnostico, valorConsulta}: ConsultaProps) {
        
        return(
            <View style= {styles.box}>
                <Text style={styles.animal}>{animal}</Text>
                
                <Text style={styles.horaEntrada}>{horaEntrada}</Text>
                
                <Text style={styles.horaSaida}>{horaSaida}</Text>
                
                <Text style={styles.diagnostico}>{diagnostico}</Text>

                <Text style={styles.valorConsulta}>{valorConsulta}</Text>

            </View>
        );

    }

    const styles = StyleSheet.create({
        box: {
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 20,
            margin: 20,
            borderRadius: 5,
        },
        animal: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        horaEntrada: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        horaSaida: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        diagnostico: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        valorConsulta: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    });
