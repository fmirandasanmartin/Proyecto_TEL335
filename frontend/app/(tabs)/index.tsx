// app/(tabs)/index.tsx
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Importar el router de Expo

const App = () => {
  const handlePress = () => {
    // Navegar a la página de catálogo
    router.push('/catalogo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenidos a PetMatch!</Text>
      <Text style={styles.subText}>Ayudemos a encontrar un hogar para los animales en situación de calle.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Ver animales disponibles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a9df4',
    marginBottom: 20,
  },
  subText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2a9df4',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;