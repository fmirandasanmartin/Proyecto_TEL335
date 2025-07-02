// components/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Secuencia de animaciones
    const animationSequence = Animated.sequence([
      // 1. Logo aparece con escalado
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // 2. Pausa para mostrar el logo
      Animated.delay(1500),
      // 3. Logo se desvanece
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      // Llamar onFinish cuando termine la animación
      onFinish();
    });
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Puedes usar tu imagen o crear el logo con componentes */}
        <View style={styles.logoCircle}>
          <View style={styles.pawPrint}>
            {/* Dedos de la pata */}
            <View style={[styles.toe, styles.toe1]} />
            <View style={[styles.toe, styles.toe2]} />
            <View style={[styles.toe, styles.toe3]} />
            <View style={[styles.toe, styles.toe4]} />
            {/* Almohadilla principal */}
            <View style={styles.mainPad} />
          </View>
          {/* Estrellitas decorativas */}
          <View style={[styles.star, styles.star1]} />
          <View style={[styles.star, styles.star2]} />
          <View style={[styles.star, styles.star3]} />
          <View style={[styles.star, styles.star4]} />
        </View>
        
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          PetMatch
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#ffb3b3', // Rosa suave como en tu imagen
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
    backgroundColor: '#ff9999', // Rosa más intenso
    top: 10,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  toe2: {
    width: 30,
    height: 40,
    backgroundColor: '#f4e4bc', // Beige como en tu imagen
    top: 5,
    left: 45,
  },
  toe3: {
    width: 25,
    height: 35,
    backgroundColor: '#a8d8d8', // Azul verdoso
    top: 10,
    right: 20,
    transform: [{ rotate: '15deg' }],
  },
  toe4: {
    width: 20,
    height: 25,
    backgroundColor: '#f4e4bc', // Beige
    top: 20,
    right: 5,
    borderRadius: 15,
  },
  mainPad: {
    width: 50,
    height: 45,
    backgroundColor: '#f4e4bc', // Beige
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
    color: '#7fb3b3', // Verde azulado como en tu imagen
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'System', // Puedes cambiar por una fuente custom
  },
});