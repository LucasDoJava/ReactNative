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

  const onAdd = (name: string, race: string, age: number, peso: number) => {
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
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <MyScrollView headerBackgroundColor={{ light: '#FAFAFA', dark: '#2E2E2E' }}>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {animals.map(animal => (
          <Animais
            key={animal.id}
            name={animal.name}
            race={animal.race}
            age={animal.age}
            peso={animal.peso}
          />
        ))}
      </ThemedView>

      <AnimalsModal
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
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
    justifyContent: 'center',
    paddingVertical: 30,
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
});
