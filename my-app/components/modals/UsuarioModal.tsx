import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from "react";
import { IUsuario } from "@/interfaces/IUsuario";

export type UsuarioModalProps = {
    visible: boolean;
    onAdd: (email: string,
        senha: string,
        id: number) => void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    usuarios? : IUsuario
};

export default function AnimalsModal({visible, onAdd, onCancel, onDelete ,usuarios}: UsuarioModalProps) {
    const [email, setEmail] = useState<string>('');
   
    const [senha, setSenha] = useState<string>('');

    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (usuarios){
            setEmail(usuarios.email);
            setSenha(usuarios.senha);
            setId(usuarios.id);
        }else{
            setEmail('');
            setSenha('');
            setId(0);
        }
    }, [usuarios]
    )

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Senha"
                        value={senha}
                        onChangeText={text => setSenha(text)}
                    />
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(email, senha, id)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id <= 0}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        backgroundColor: 'orange',
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
        height: 40,
        borderRadius: 5,
        alignSelf: 'stretch',
        margin: 5,
        paddingHorizontal: 5
    },
});