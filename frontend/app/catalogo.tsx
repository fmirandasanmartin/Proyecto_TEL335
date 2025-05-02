// app/catalogo.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAnimales } from '../hooks/useAnimales';
import AnimalCard from '../components/AnimalCard';
import { animalRepository } from '../database/Database';

// Tipos de animales disponibles
const TIPOS_ANIMALES = [
  { label: 'Todos', value: '' },
  { label: 'Perros', value: 'perro' },
  { label: 'Gatos', value: 'gato' }
];

export default function Catalogo() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>('');
  const { animales, cargando, error } = useAnimales(tipoSeleccionado);
  const [datosInicializados, setDatosInicializados] = useState(false);

  // Verificar si los datos están inicializados
  useEffect(() => {
    async function verificarDatos() {
      try {
        const datos = await animalRepository.getAnimales();
        setDatosInicializados(true);
      } catch (error) {
        console.error('Error al verificar datos:', error);
      }
    }
    
    verificarDatos();
  }, []);

  // Si los datos aún no están inicializados, mostramos un indicador de carga
  if (!datosInicializados) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#2a9df4" />
        <Text style={styles.cargandoTexto}>Inicializando datos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Catálogo de Animales</Text>
      
      <View style={styles.filtroContenedor}>
        <Text style={styles.filtroEtiqueta}>Filtrar por tipo:</Text>
        <View style={styles.pickerContenedor}>
          <Picker
            selectedValue={tipoSeleccionado}
            onValueChange={(itemValue) => setTipoSeleccionado(itemValue)}
            style={styles.picker}
          >
            {TIPOS_ANIMALES.map((tipo) => (
              <Picker.Item 
                key={tipo.value} 
                label={tipo.label} 
                value={tipo.value} 
              />
            ))}
          </Picker>
        </View>
      </View>
      
      {cargando ? (
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color="#2a9df4" />
          <Text style={styles.cargandoTexto}>Cargando animales...</Text>
        </View>
      ) : error ? (
        <View style={styles.error}>
          <Text style={styles.errorTexto}>{error}</Text>
          <TouchableOpacity 
            style={styles.botonReintentar}
            onPress={() => setTipoSeleccionado(tipoSeleccionado)} // Forzar recarga
          >
            <Text style={styles.botonReintentarTexto}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.resultados}>
            {animales.length} {animales.length === 1 ? 'resultado' : 'resultados'} encontrados
          </Text>
          <FlatList
            data={animales}
            renderItem={({ item }) => <AnimalCard animal={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#2a9df4',
  },
  filtroContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  filtroEtiqueta: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  pickerContenedor: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cargandoTexto: {
    marginTop: 10,
    color: '#555',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTexto: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  botonReintentar: {
    backgroundColor: '#2a9df4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonReintentarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultados: {
    margin: 16,
    fontSize: 14,
    color: '#555',
  },
  lista: {
    paddingBottom: 20,
  },
});