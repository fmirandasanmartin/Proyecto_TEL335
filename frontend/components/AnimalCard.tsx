// components/AnimalCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Animal } from '../database/Database';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <View style={styles.tarjeta}>
      <Image 
        source={{ uri: animal.imagen }} 
        style={styles.imagen}
      />
      <View style={styles.contenido}>
        <Text style={styles.nombre}>{animal.nombre}</Text>
        <Text style={styles.tipo}>{animal.tipo.charAt(0).toUpperCase() + animal.tipo.slice(1)}</Text>
        <Text style={styles.detalles}>
          {animal.genero.charAt(0).toUpperCase() + animal.genero.slice(1)}, {animal.edad} {animal.edad === 1 ? 'año' : 'años'}
        </Text>
        <Text style={styles.region}>{animal.region}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 2,
  },
  detalles: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
  region: {
    fontSize: 14,
    color: '#3498db',
  },
});

export default AnimalCard;