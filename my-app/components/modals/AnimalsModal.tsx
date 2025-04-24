import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from "react";

export type AnimalsModalProps = {
    visible: boolean;
    onAdd: (name: string,
        race: string,
        age: number,
        peso: number,) => void;
    onCancel: () => void;
};

export default function AnimalsModal({visible, onAdd, onCancel}: AnimalsModalProps) {
    const [name, setName] = useState('');
   
    const [race, setRace] = useState('');
   
    const [age, setAge] = useState('');
    
    const [peso, setPeso] = useState('');

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onCancel}>
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
                        value={age}
                        onChangeText={text => setAge(text)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Peso"
                        value={peso}
                        onChangeText={text => setPeso(text)}
                        keyboardType="numeric"
                    />
    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(name, race, parseInt(age), parseFloat(peso))}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 7)',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    boxContainer: {
        backgroundColor: '#FFF',
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
        paddingHorizontal: 5
    },
});