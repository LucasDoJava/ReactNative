import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type UsuarioProps = {
    email: string;
    senha: string;
    };

    export default function Animais({email, senha}: UsuarioProps) {
        
        return(
            <View style= {styles.box}>
                <Text style={styles.email}>{email}</Text>
                
                <Text style={styles.senha}>{senha}</Text>
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
        email: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        senha: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    });
