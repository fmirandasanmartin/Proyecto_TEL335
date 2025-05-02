// database/Database.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Animal {
  id: number;
  nombre: string;
  tipo: string;
  genero: string;
  edad: number;
  region: string;
  descripcion: string;
  imagen: string;
  fechaRegistro: string;
}

const STORAGE_KEY = 'animales_data';

class AnimalRepository {
  private ultimoId: number = 0;
  
  constructor() {
    // Inicializar cuando se crea la instancia
    this.init();
  }
  
  private async init() {
    try {
      // Verificar si ya existen datos
      const animalesData = await AsyncStorage.getItem(STORAGE_KEY);
      if (!animalesData) {
        // No hay datos, insertamos los ejemplos
        console.log('No se encontraron datos previos, inicializando con datos de ejemplo');
        await this.insertarDatosEjemplo();
      } else {
        // Ya hay datos, obtenemos el último ID
        const animales: Animal[] = JSON.parse(animalesData);
        if (animales.length > 0) {
          this.ultimoId = Math.max(...animales.map(a => a.id));
          console.log(`Base de datos cargada con ${animales.length} animales. Último ID: ${this.ultimoId}`);
        }
      }
    } catch (error) {
      console.error('Error al inicializar el repositorio:', error);
    }
  }
  
  // Obtener todos los animales
  async getAnimales(): Promise<Animal[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error al obtener animales:', error);
      return [];
    }
  }
  
  // Obtener animales por tipo
  async getAnimalesPorTipo(tipo: string): Promise<Animal[]> {
    try {
      const animales = await this.getAnimales();
      return animales.filter(animal => animal.tipo === tipo);
    } catch (error) {
      console.error('Error al filtrar animales por tipo:', error);
      return [];
    }
  }
  
  // Insertar un nuevo animal
  async insertAnimal(animal: Omit<Animal, 'id' | 'fechaRegistro'>): Promise<number> {
    try {
      const animales = await this.getAnimales();
      this.ultimoId++;
      
      const nuevoAnimal: Animal = {
        id: this.ultimoId,
        fechaRegistro: new Date().toISOString(),
        ...animal
      };
      
      animales.push(nuevoAnimal);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(animales));
      
      return this.ultimoId;
    } catch (error) {
      console.error('Error al insertar animal:', error);
      throw error;
    }
  }
  
  // Insertar datos de ejemplo
  async insertarDatosEjemplo(): Promise<void> {
    try {
      // Asegurarnos de empezar con una base de datos limpia
      await AsyncStorage.removeItem(STORAGE_KEY);
      this.ultimoId = 0;
      
      const animalesEjemplo = [
        {
          nombre: 'Firulais',
          tipo: 'perro',
          genero: 'macho',
          edad: 3,
          region: 'Metropolitana',
          descripcion: 'Perro juguetón y cariñoso',
          imagen: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1003.jpg'
        },
        {
          nombre: 'Luna',
          tipo: 'perro',
          genero: 'hembra',
          edad: 2,
          region: 'Valparaíso',
          descripcion: 'Perrita tranquila y leal',
          imagen: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1722.jpg'
        },
        {
          nombre: 'Rocky',
          tipo: 'perro',
          genero: 'macho',
          edad: 5,
          region: 'Biobío',
          descripcion: 'Le encanta jugar a la pelota',
          imagen: 'https://images.dog.ceo/breeds/labrador/n02099712_986.jpg'
        },
        {
          nombre: 'Michi',
          tipo: 'gato',
          genero: 'hembra',
          edad: 1,
          region: 'Metropolitana',
          descripcion: 'Gatita juguetona y curiosa',
          imagen: 'https://cdn2.thecatapi.com/images/3ut.jpg'
        },
        {
          nombre: 'Simba',
          tipo: 'gato',
          genero: 'macho',
          edad: 3,
          region: 'Valparaíso',
          descripcion: 'Gato independiente pero cariñoso',
          imagen: 'https://cdn2.thecatapi.com/images/MTY3ODkwMg.jpg'
        },
        {
          nombre: 'Nina',
          tipo: 'gato',
          genero: 'hembra',
          edad: 2,
          region: 'O\'Higgins',
          descripcion: 'Gatita muy tranquila, ideal para departamento',
          imagen: 'https://cdn2.thecatapi.com/images/9u7.jpg'
        }
      ];
      
      // Insertar cada animal uno por uno
      for (const animal of animalesEjemplo) {
        await this.insertAnimal(animal);
      }
      
      console.log(`${animalesEjemplo.length} animales de ejemplo insertados correctamente`);
    } catch (error) {
      console.error('Error al insertar datos de ejemplo:', error);
    }
  }
}

// Singleton para usar en toda la aplicación
export const animalRepository = new AnimalRepository();