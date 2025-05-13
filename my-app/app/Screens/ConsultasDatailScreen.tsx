import { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import { IConsultas } from '@/interfaces/IConsultas'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router'

export default function ConsultasDatailScreen() {
  const [consultas, setconsultas] = useState<IConsultas[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { consultasId } = useLocalSearchParams();
    const [consultasForDatail, setConsultasDatail] = useState<IConsultas>();

     useEffect(() => {
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@MyApp:petShop");
        const consultasData: IConsultas[] = data != null ? JSON.parse(data) : [];
        setconsultas(consultasData)

        consultasData.forEach((element) => {
            if(element.id.toString() == consultasId){
                setConsultasDatail(element);
            }
        });

      }catch (e){
        console.error("Erro ao recuperar dados:", e);
    }
  }
  getData()
  }, [])

  const onDelete = () => {
    if(consultasForDatail){
      const updateConsultas: Array<IConsultas> = [];
  
      for (let index = 0; index < consultas.length; index++) {
          const consulta = consultas[index];
  
          if (consulta.id !== consultasForDatail.id) {
              updateConsultas.push(consulta);
          }
      }
  
      setconsultas(updateConsultas);
      AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updateConsultas))
    }
    router.replace("/(tabs)/ConsultaListScreen")
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
          <Text style={styles.animal}>{consultasForDatail ? consultasForDatail.animal : ''} </Text>
          <Text style={styles.horaEntrada}>{consultasForDatail ? consultasForDatail.horaEntrada : ''} </Text>
          <Text style={styles.horaSaida}>{consultasForDatail ? consultasForDatail.horaSaida : ''} </Text>
          <Text style={styles.diagnostico}>{consultasForDatail ? consultasForDatail.diagnostico : ''} </Text>
           <Text style={styles.valorConsulta}>{consultasForDatail ? consultasForDatail.valorConsulta : ''} </Text>
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
  animal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  horaEntrada: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  horaSaida: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  diagnostico: {
    fontSize: 18,
    color: '#666',
  },
   valorConsulta: {
    fontSize: 18,
    color: '#666',
  },
});