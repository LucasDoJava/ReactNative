import { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import { IAnimals } from '@/interfaces/IAnimals'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router'

export default function AnimalsDatailScreen() {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { animaisId } = useLocalSearchParams();
  const [animaisForDatail, setAnimaisDatail] = useState<IAnimals>();

  useEffect(() => {
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@MyApp:petShop");
        const animaisData: IAnimals[] = data != null ? JSON.parse(data) : [];
        setAnimals(animaisData)

        animaisData.forEach((element) => {
            if(element.id.toString() == animaisId){
                setAnimaisDatail(element);
            }
        });

      }catch (e){
        console.error("Erro ao recuperar dados:", e);
    }
  }
  getData()
  }, [])

const onDelete = () => {
    if(animaisForDatail){
    const updatedAnimals: Array<IAnimals> = [];

    for (let index = 0; index < animals.length; index++) {
        const animal = animals[index];

        if (animal.id !== animaisForDatail.id) {
            updatedAnimals.push(animal);
        }
    }

    setAnimals(updatedAnimals);
    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updatedAnimals))
}
router.replace("/(tabs)/AnimalsListsScreen");
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
        <Text style={styles.name}>{animaisForDatail ? animaisForDatail.name : ''} </Text>
        <Text style={styles.animalbreed}>{animaisForDatail ? animaisForDatail.animalbreed : ''} </Text>
        <Text style={styles.age}>{animaisForDatail ? animaisForDatail.age : ''} </Text>
        <Text style={styles.peso}>{animaisForDatail ? animaisForDatail.peso : ''} </Text>
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  animalbreed: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  age: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666',
  },
  peso: {
    fontSize: 18,
    color: '#666',
  },
});
