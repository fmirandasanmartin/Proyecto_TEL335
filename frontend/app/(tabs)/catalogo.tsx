// app/catalogo.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAnimales } from '../../hooks/useAnimales';
import AnimalCard from '../../components/AnimalCard';
import { animalService } from '../../services/AnimalService';

// Tipos de animales disponibles
const TIPOS_ANIMALES = [
  { label: 'Todos', value: '' },
  { label: 'Perros', value: 'perro' },
  { label: 'Gatos', value: 'gato' }
];

const { width, height } = Dimensions.get('window');

// Componente del splash interno
function InternalSplash({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      onFinish();
    });
  }, []);

  return (
    <View style={splashStyles.container}>
      <Animated.View
        style={[
          splashStyles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo recreado con componentes */}
        <View style={splashStyles.logoCircle}>
          <View style={splashStyles.pawPrint}>
            <View style={[splashStyles.toe, splashStyles.toe1]} />
            <View style={[splashStyles.toe, splashStyles.toe2]} />
            <View style={[splashStyles.toe, splashStyles.toe3]} />
            <View style={[splashStyles.toe, splashStyles.toe4]} />
            <View style={splashStyles.mainPad} />
          </View>
          <View style={[splashStyles.star, splashStyles.star1]} />
          <View style={[splashStyles.star, splashStyles.star2]} />
          <View style={[splashStyles.star, splashStyles.star3]} />
          <View style={[splashStyles.star, splashStyles.star4]} />
        </View>
        
        <Animated.Text style={[splashStyles.title, { opacity: fadeAnim }]}>
          PetMatch
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

export default function Catalogo() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>('');
  const { animales, cargando, error, recargar } = useAnimales(tipoSeleccionado);
  const [conexionVerificada, setConexionVerificada] = useState(false);
  const [errorConexion, setErrorConexion] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  // Verificar conexión con el backend
  useEffect(() => {
    async function verificarConexion() {
      try {
        await animalService.testConnection();
        setConexionVerificada(true);
        console.log('Conexión con el backend establecida correctamente');
      } catch (error) {
        console.error('Error de conexión con el backend:', error);
        setErrorConexion(error instanceof Error ? error.message : 'Error de conexión');
      }
    }
    
    // Solo verificar conexión después del splash
    if (!showSplash) {
      verificarConexion();
    }
  }, [showSplash]);

  // Mostrar splash al inicio
  if (showSplash) {
    return <InternalSplash onFinish={() => setShowSplash(false)} />;
  }

  // Si hay error de conexión, mostramos un mensaje específico
  if (errorConexion) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <View style={styles.error}>
          <Text style={styles.titulo}>Catálogo de Animales</Text>
          <Text style={styles.errorTexto}>
            No se pudo conectar con el servidor:{'\n'}
            {errorConexion}
          </Text>
          <Text style={styles.errorDetalle}>
            Asegúrate de que el backend esté ejecutándose en el puerto 5000
          </Text>
          <TouchableOpacity 
            style={styles.botonReintentar}
            onPress={() => {
              setErrorConexion(null);
              setConexionVerificada(false);
            }}
          >
            <Text style={styles.botonReintentarTexto}>Reintentar conexión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Si la conexión aún no está verificada, mostramos un indicador de carga
  if (!conexionVerificada) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color="#2a9df4" />
          <Text style={styles.cargandoTexto}>Conectando con el servidor...</Text>
        </View>
      </SafeAreaView>
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
            onPress={() => recargar()}
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

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ffb3b3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  pawPrint: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  toe: {
    position: 'absolute',
    borderRadius: 25,
  },
  toe1: {
    width: 25,
    height: 35,
    backgroundColor: '#ff9999',
    top: 10,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  toe2: {
    width: 30,
    height: 40,
    backgroundColor: '#f4e4bc',
    top: 5,
    left: 45,
  },
  toe3: {
    width: 25,
    height: 35,
    backgroundColor: '#a8d8d8',
    top: 10,
    right: 20,
    transform: [{ rotate: '15deg' }],
  },
  toe4: {
    width: 20,
    height: 25,
    backgroundColor: '#f4e4bc',
    top: 20,
    right: 5,
    borderRadius: 15,
  },
  mainPad: {
    width: 50,
    height: 45,
    backgroundColor: '#f4e4bc',
    borderRadius: 25,
    position: 'absolute',
    bottom: 15,
    left: 25,
  },
  star: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#a8d8d8',
    borderRadius: 4,
  },
  star1: {
    top: 30,
    left: 40,
    transform: [{ rotate: '45deg' }],
  },
  star2: {
    top: 50,
    right: 35,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  star3: {
    bottom: 40,
    left: 30,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  star4: {
    bottom: 60,
    right: 40,
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7fb3b3',
    textAlign: 'center',
    letterSpacing: 2,
  },
});

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
    marginBottom: 10,
    fontSize: 16,
  },
  errorDetalle: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
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