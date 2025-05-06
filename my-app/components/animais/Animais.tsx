import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type AnimalsProps = {
    name: string;
    animalbreed: string;
    age: number;
    peso: number;
    };

    export default function Animais({name, animalbreed, age, peso}: AnimalsProps) {
        
        return(
            <View style= {styles.box}>
                <Text style={styles.name}>{name}</Text>
                
                <Text style={styles.animalbreed}>{animalbreed}</Text>
                
                <Text style={styles.age}>{age}</Text>
                
                <Text style={styles.peso}>{peso}</Text>

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
        name: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        animalbreed: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        age: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        peso: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    });
