// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  LinearGradient,
} from 'react-native';
import { animalService } from '../../services/AnimalService';

export default function Dashboard() {
  const [totalAnimales, setTotalAnimales] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Datos hardcodeados mientras conectamos la BD
  const estadisticasHardcoded = {
    adoptados: 23,
    esperando: 6,
    masVisitado: "Max",
    masVisitadoTipo: "🐕",
    necesitaAtencion: "Luna",
    necesitaAtencionDias: 45,
    ultimasAdopciones: [
      { nombre: "Firulais", familia: "Familia López", emoji: "🐕" },
      { nombre: "Mimi", familia: "Familia García", emoji: "🐱" },
      { nombre: "Rocky", familia: "Familia Silva", emoji: "🐕" }
    ]
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      const animales = await animalService.getAnimales();
      setTotalAnimales(animales.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2a9df4" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={cargarDatos}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Logo/Título */}
        <View style={styles.titleContainer}>
          <Image 
            source={require('../../assets/images/Hogar.png')} 
            style={styles.titleImage}
            resizeMode="contain"
          />
        </View>

        {/* Estadísticas Principales */}
        <View style={styles.mainStatsContainer}>
          {/* Adoptados vs Esperando */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.adoptedCard]}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>❤️</Text>
              </View>
              <Text style={styles.statNumber}>{estadisticasHardcoded.adoptados}</Text>
              <Text style={styles.statLabel}>Familias Felices</Text>
              <Text style={styles.statSubtext}>Este mes</Text>
            </View>
            
            <View style={[styles.statCard, styles.waitingCard]}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🏠</Text>
              </View>
              <Text style={styles.statNumber}>{totalAnimales || estadisticasHardcoded.esperando}</Text>
              <Text style={styles.statLabel}>Esperando Amor</Text>
              <Text style={styles.statSubtext}>Disponibles</Text>
            </View>
          </View>

          {/* Destacados */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.popularCard]}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🌟</Text>
              </View>
              <Text style={styles.statName}>
                {estadisticasHardcoded.masVisitadoTipo} {estadisticasHardcoded.masVisitado}
              </Text>
              <Text style={styles.statLabel}>Más Visitado</Text>
              <Text style={styles.statSubtext}>¡Todo un galán!</Text>
            </View>
            
            <View style={[styles.statCard, styles.urgentCard]}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>⏰</Text>
              </View>
              <Text style={styles.statName}>🐱 {estadisticasHardcoded.necesitaAtencion}</Text>
              <Text style={styles.statLabel}>Necesita Amor</Text>
              <Text style={styles.statSubtext}>{estadisticasHardcoded.necesitaAtencionDias} días esperando</Text>
            </View>
          </View>
        </View>

        {/* Últimas Adopciones */}
        <View style={styles.adoptionsCard}>
          <View style={styles.adoptionsHeader}>
            <Text style={styles.adoptionsTitle}>🎉 Últimas Alegrías</Text>
            <Text style={styles.adoptionsSubtitle}>Nuevas familias formadas</Text>
          </View>
          
          <View style={styles.adoptionsList}>
            {estadisticasHardcoded.ultimasAdopciones.map((adopcion, index) => (
              <View key={index} style={styles.adoptionItem}>
                <View style={styles.adoptionIcon}>
                  <Text style={styles.adoptionEmoji}>{adopcion.emoji}</Text>
                </View>
                <View style={styles.adoptionInfo}>
                  <Text style={styles.adoptionName}>{adopcion.nombre}</Text>
                  <Text style={styles.adoptionFamily}>→ {adopcion.familia}</Text>
                </View>
                <View style={styles.heartIcon}>
                  <Text style={styles.heartEmoji}>💕</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <TouchableOpacity style={styles.ctaButton}>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaEmoji}>🐾</Text>
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>¿Listo para adoptar?</Text>
              <Text style={styles.ctaSubtitle}>Explora todos nuestros amigos</Text>
            </View>
            <Text style={styles.ctaArrow}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Espaciado final */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleImage: {
    width: '85%',
    height: 120,
    maxWidth: 350,
    minWidth: 220,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2a9df4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainStatsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  adoptedCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  waitingCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  popularCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
  },
  urgentCard: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#9b59b6',
  },
  statIcon: {
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 28,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'center',
  },
  statSubtext: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 2,
  },
  adoptionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  adoptionsHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  adoptionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  adoptionsSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  adoptionsList: {
    gap: 12,
  },
  adoptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  adoptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  adoptionEmoji: {
    fontSize: 20,
  },
  adoptionInfo: {
    flex: 1,
  },
  adoptionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  adoptionFamily: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  heartIcon: {
    marginLeft: 8,
  },
  heartEmoji: {
    fontSize: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  ctaText: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  ctaArrow: {
    fontSize: 24,
    color: '#3498db',
    marginLeft: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});