import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from "react";

export type ConsultaModalProps = {
    visible: boolean;
    onAdd: (animal: string,
        horaEntrada: string,
        horaSaida: string,
        diagnostico: string,
        valorConsulta: number) => void;
    onCancel: () => void;
};

export default function ConsultaModal({visible, onAdd, onCancel}: ConsultaModalProps) {
    const [animal, setAnimal] = useState('');
   
    const [horaEntrada, setHoraEntrada] = useState('');
   
    const [horaSaida, setHoraSaida] = useState('');
    
    const [diagnostico, setDiagnostico] = useState('');

    const [valorConsulta, setValorConuslta] = useState('');

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onCancel}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Animal"
                        value={animal}
                        onChangeText={text => setAnimal(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Data Entrada"
                        value={horaEntrada}
                        onChangeText={text => setHoraEntrada(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Data Saída"
                        value={horaSaida}
                        onChangeText={text => setHoraSaida(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Diagnóstico"
                        value={diagnostico}
                        onChangeText={text => setDiagnostico(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="valor da Consulta"
                        value={valorConsulta}
                        onChangeText={text => setValorConuslta(text)}
                        keyboardType="numeric"
                    />
    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(animal, horaEntrada, horaSaida, diagnostico, parseInt(valorConsulta))}>
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