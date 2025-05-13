import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Animais from '@/components/animais/Animais';
import MyScrollView from '@/components/MyScrollView';
import { useEffect, useState } from 'react';
import { IAnimals } from '@/interfaces/IAnimals'; 
import AnimalsModal from '@/components/modals/AnimalsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router } from 'expo-router'

export default function AnimalsListScreen() {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAnimal, setSelectAnimal] = useState<IAnimals>();

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@MyApp:petShop");
        const animaisData = data != null ? JSON.parse(data) : [];
        setAnimals(animaisData)
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


  const onAdd = (name: string, animalbreed: string, age: number, peso: number, id?: number) => {

    if(!id || id <= 0){
      const newAnimal: IAnimals = {
        id: Math.random() * 1000,
      name: name,
      animalbreed: animalbreed,
      age: age,
      peso: peso,
      queries: 0
      };
    

    const updatedAnimals: IAnimals[] = [
      ...animals,
      newAnimal
    ];

    setAnimals(updatedAnimals);
    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updatedAnimals))
  }else{
    animals.forEach(animal => {
      if(animal.id == id){
        animal.name = name;
        animal.animalbreed = animalbreed;
        animal.age = age;
        animal.peso = peso;
      }
    });

    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(animals))
  }
    
    setModalVisible(false);
  };

  const onDelete = (id: number) => {
    const updatedAnimals: Array<IAnimals> = [];

    for (let index = 0; index < animals.length; index++) {
        const animal = animals[index];

        if (animal.id !== id) {
            updatedAnimals.push(animal);
        }
    }

    setAnimals(updatedAnimals);
    AsyncStorage.setItem("@MyApp:petShop", JSON.stringify(updatedAnimals))
    setModalVisible(false)
};

  const openModal = () => {
    setSelectAnimal(undefined);
    setModalVisible(true);
  };

  const openEditModal = (selectedAnimal: IAnimals) => {
    setSelectAnimal(selectedAnimal)
    setModalVisible(true);
  }

  const navigateToDetails = (selectedAnimal: IAnimals) =>{
    router.push({ pathname: '/Screens/AnimaisDatailScreen' , params: {animaisId: selectedAnimal.id}})
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

        {animals.map(animal => 
          <TouchableOpacity onPress={() => navigateToDetails(animal)}>
             <Animais
            key={animal.id}
            name={animal.name}
            animalbreed={animal.animalbreed}
            age={animal.age}
            peso={animal.peso}
          />
          </TouchableOpacity>
        )}
      </ThemedView>

      <AnimalsModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        animais= {selectedAnimal}
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
