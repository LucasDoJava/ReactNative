import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from "react";
import { IConsultas } from "@/interfaces/IConsultas";

export type ConsultaModalProps = {
    visible: boolean;
    onAdd: (animal: string,
        horaEntrada: string,
        horaSaida: string,
        diagnostico: string,
        valorConsulta: number,
        id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    consultas ? : IConsultas
};

export default function ConsultaModal({visible, onAdd, onCancel, onDelete, consultas}: ConsultaModalProps) {
    const [animal, setAnimal] = useState<string>('');
   
    const [horaEntrada, setHoraEntrada] = useState<string>('');
   
    const [horaSaida, setHoraSaida] = useState<string>('');
    
    const [diagnostico, setDiagnostico] = useState<string>('');

    const [valorConsulta, setValorConuslta] = useState<number>();

     const [id, setId] = useState<number>(0);

      useEffect(() => {
             if (consultas){
                 setAnimal(consultas.animal);
                 setHoraEntrada(consultas.horaEntrada);
                 setHoraSaida(consultas.horaSaida);
                 setDiagnostico(consultas.diagnostico);
                 setValorConuslta(consultas.valorConsulta);
                 setId(consultas.id);
             }else{
                setAnimal('');
                setHoraEntrada('');
                setHoraSaida('');
                setDiagnostico('');
                 setValorConuslta(0);
                 setId(0);
             }
         }, [consultas]
         )

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
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
                        value={valorConsulta!== undefined ? valorConsulta.toString() : ''}
                        onChangeText={text => setValorConuslta(Number(text))}
                        keyboardType="numeric"
                    />
    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(animal, horaEntrada, horaSaida, diagnostico, valorConsulta!, id)}>
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
        paddingHorizontal: 5
    },
});