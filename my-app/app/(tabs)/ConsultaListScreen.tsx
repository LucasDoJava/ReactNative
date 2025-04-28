import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Consulta from '@/components/consultas/Consulta';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IConsultas } from '@/interfaces/IConsultas'; 
import ConsultaModal from '@/components/modals/ConsultaModal';

export default function AnimalsListScreen() {
  const [consultas, setconsultas] = useState<IConsultas[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onAdd = (animal: string, horaEntrada: string, horaSaida: string, diagnostico: string, valorConsulta: number) => {
    const newConsulta: IConsultas = {
      id: Math.random() * 1000,
      animal: animal,
      horaEntrada: horaEntrada,
      horaSaida: horaSaida,
      diagnostico: diagnostico,
      valorConsulta: valorConsulta
    };

    const updateConsultas: IConsultas[] = [
      ...consultas,
      newConsulta
    ];

    setconsultas(updateConsultas);
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
  <TouchableOpacity style={styles.addButton} onPress={openModal}>
    <Text style={styles.headerButton}>+</Text>
  </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.container}>
        {consultas.map(consul => (
          <Consulta
            key={consul.id}
            animal={consul.animal}
            horaEntrada={consul.horaEntrada}
            horaSaida={consul.horaSaida}
            diagnostico={consul.diagnostico}
            valorConsulta={consul.valorConsulta}
          />
        ))}
      </ThemedView>

      <ConsultaModal
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
