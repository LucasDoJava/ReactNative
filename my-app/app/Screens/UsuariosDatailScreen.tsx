import { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import { IUsuario } from '@/interfaces/IUsuario'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router'

export default function UsuarioDatailScreen() {
  const [usuario, setUsuario] = useState<IUsuario[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
   const { usuarioId } = useLocalSearchParams();
    const [usuarioForDatail, setUsuarioDatail] = useState<IUsuario>();

     useEffect(() => {
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@MyApp:petShop");
        const usuarioData: IUsuario[] = data != null ? JSON.parse(data) : [];
        setUsuario(usuarioData)

          usuarioData.forEach((element) => {
            if(element.id.toString() == usuarioId){
                setUsuarioDatail(element);
            }
             });

      }catch (e){
        console.error("Erro ao recuperar dados:", e);
    }
  }
  getData()
  }, [])

 const onDelete = () => {
    if(usuarioForDatail){
    const updatedUsuario: Array<IUsuario> = [];

    for (let index = 0; index < usuario.length; index++) {
        const usuarios = usuario[index];

        if (usuarios.id !== usuarioForDatail.id) {
            updatedUsuario.push(usuarios);
        }
    }

    setUsuario(updatedUsuario);
    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updatedUsuario))
}
router.replace("/(tabs)/UsuarioListScreen")
};

const openModal = () => {
    setModalVisible(true);
  };

  return(
      <View>
           <ThemedView style={styles.headerContainer}>
               <TouchableOpacity onPress={() => onDelete()}>
                    <Text style={styles.headerButton}>X</Text>
               </TouchableOpacity>
           </ThemedView>
      
      <View style={styles.box}>
          <Text style={styles.email}>{usuarioForDatail ? usuarioForDatail.email : ''} </Text>
          <Text style={styles.senha}>{usuarioForDatail ? usuarioForDatail.senha : ''} </Text>
      </View>
      
      </View>
    );
  }

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#009DAE',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 100,
    paddingTop: 10,
  },
  headerButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  email: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  senha: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  });
