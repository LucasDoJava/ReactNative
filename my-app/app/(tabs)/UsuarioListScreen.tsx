import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Usuario from '@/components/usuarios/Usuario';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IUsuario } from '@/interfaces/IUsuario'; 
import UsuarioModal from '@/components/modals/UsuarioModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function UsuarioListScreen() {
  const [usuario, setUsuario] = useState<IUsuario[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUsuario, setSelectUsuario] = useState<IUsuario>();

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@MyApp:petShop");
        const usuarioData = data != null ? JSON.parse(data) : [];
        setUsuario(usuarioData)
      }catch (e){
        console.error("Erro ao recuperar dados:", e);
    }
  }
  getData()
  }, [])

  useEffect(() => {
    (async() => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if ( status !== 'granted'){
          setErrorMsg('Permission to access location was denied');
          return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg){
    text = errorMsg;
  } else if (location){
    text = JSON.stringify(location);
  }


  const onAdd = (email: string, senha: string, id?: number) => {

    if(!id || id <= 0){
      const newUsuario: IUsuario = {
        id: Math.random() * 1000,
      email: email,
      senha: senha
      };
    

    const updatedUsuario: IUsuario[] = [
      ...usuario,
      newUsuario
    ];

    setUsuario(updatedUsuario);
    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updatedUsuario))
  }else{
    usuario.forEach(usuario => {
      if(usuario.id == id){
        usuario.email = email;
        usuario.senha = senha;
      }
    });

    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(usuario))
  }
    
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const updatedUsuario: Array<IUsuario> = [];

    for (let index = 0; index < usuario.length; index++) {
        const usuarios = usuario[index];

        if (usuarios.id !== id) {
            updatedUsuario.push(usuarios);
        }
    }

    setUsuario(updatedUsuario);
    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updatedUsuario))
    setModalVisible(false)
};

  const openModal = () => {
    setSelectUsuario(undefined);
    setModalVisible(true);
  };

  const openEditModal = (selectedUsuario: IUsuario) => {
    setSelectUsuario(selectedUsuario)
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#FAFAFA', dark: '#2E2E2E' }}>
      <ThemedView style={styles.headerContainer}>
  <TouchableOpacity style={styles.addButton} onPress={openModal}>
    <Text style={styles.headerButton}>+</Text>
  </TouchableOpacity>
  <Text style={styles.locationText}>{text}</Text>
      </ThemedView>
  <ThemedView style={styles.container}>

        {usuario.map(usuario => 
          <TouchableOpacity onPress={() => openEditModal(usuario)}>
             <Usuario
            key={usuario.id}
            email={usuario.email}
            senha={usuario.senha}
          />
          </TouchableOpacity>
        )}
      </ThemedView>

      <UsuarioModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        usuarios= {selectedUsuario}
      />
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
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
  addButton: {
    marginTop: 30,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    alignSelf: 'flex-start', 
    marginTop: 5, 
    color: '#FFF', 
},
});
