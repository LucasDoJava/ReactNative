import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Animais from '@/components/animais/Animais';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IAnimals } from '@/interfaces/IAnimals'; 
import AnimalsModal from '@/components/modals/AnimalsModal';

export default function AnimalsListScreen() {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAnimal, setSelectAnimal] = useState<IAnimals>();

  const onAdd = (name: string, race: string, age: number, peso: number, id?: number) => {

    if(!id || id <= 0){
      const newAnimal: IAnimals = {
        id: Math.random() * 1000,
      name: name,
      race: race,
      age: age,
      peso: peso,
      queries: 0
      };
    

    const updatedAnimals: IAnimals[] = [
      ...animals,
      newAnimal
    ];

    setAnimals(updatedAnimals);
  }else{
    animals.forEach(animal => {
      if(animal.id == id){
        animal.name = name;
        animal.race = race;
        animal.age = age;
        animal.peso = peso;
      }
    });
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

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#FAFAFA', dark: '#2E2E2E' }}>
      <ThemedView style={styles.headerContainer}>
  <TouchableOpacity style={styles.addButton} onPress={openModal}>
    <Text style={styles.headerButton}>+</Text>
  </TouchableOpacity>
      </ThemedView>
  <ThemedView style={styles.container}>

        {animals.map(animal => 
          <TouchableOpacity onPress={() => openEditModal(animal)}>
             <Animais
            key={animal.id}
            name={animal.name}
            race={animal.race}
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
});
