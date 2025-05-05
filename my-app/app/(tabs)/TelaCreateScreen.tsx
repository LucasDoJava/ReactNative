import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from "react";
import { IAnimals } from "@/interfaces/IAnimals";

export type AnimalsModalProps = {
    visible: boolean;
    onAdd: (name: string,
        race: string,
        age: number,
        peso: number,
        id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    animais? : IAnimals
};

export default function AnimalsModal({visible, onAdd, onCancel, onDelete ,animais}: AnimalsModalProps) {
    const [name, setName] = useState<string>('');
   
    const [race, setRace] = useState<string>('');
   
    const [age, setAge] = useState<number>();
    
    const [peso, setPeso] = useState<number>();

    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (animais){
            setName(animais.name);
            setRace(animais.race);
            setAge(animais.age);
            setPeso(animais.peso);
            setId(animais.id);
        }else{
            setName('');
            setRace('');
            setAge(0);
            setPeso(0);
            setId(0);
        }
    }, [animais]
    )

    return (
        
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Race"
                        value={race}
                        onChangeText={text => setRace(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Age"
                        value={age !== undefined ? age.toString() : ''}
                        onChangeText={text => setAge(Number(text))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Peso"
                        value={peso !== undefined ? peso.toString() : ''}
                        onChangeText={text => setPeso(Number(text))}
                        keyboardType="numeric"
                    />
                    </View>
    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(name, race, age!, peso!, id)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onDelete(id)} disabled={id <= 0}>
                            <Text style={styles.buttonText}>
                                Deletar
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>
        
    );
}

const styles = StyleSheet.create ({
    container: {
        display:'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    boxContainer: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
    },
    buttonAdd: {
        backgroundColor: '#70C1B3',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        padding: 20,
        elevation: 3,
    },
    buttonCancel: {
        backgroundColor: '#D72638',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        padding: 20,
        elevation: 3,
    },
    buttonDelete:{
        backgroundColor: 'red',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        height: 70,
    },
    boxInput: {
        backgroundColor: 'gray',
        height: 40,
        borderRadius: 5,
        alignSelf: 'stretch',
        margin: 5,
        paddingHorizontal: 5,
        marginBottom:30,
        display: 'flex'
    },
});