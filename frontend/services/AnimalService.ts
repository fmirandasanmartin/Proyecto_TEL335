// services/AnimalService.ts - React Native Version
import { Platform } from 'react-native';

// Interfaz que coincide con el backend
interface AnimalBackend {
  id: number;
  nombre: string;
  tipo: string;
  genero: string;
  edad: number;
  region: string;
  descripcion: string;
  imagen: string;
  fecha_registro: string;
}

// Interfaz para el frontend (mantiene compatibilidad con el código existente)
export interface Animal {
  id: number;
  nombre: string;
  tipo: string;
  genero: string;
  edad: number;
  region: string;
  descripcion: string;
  imagen: string;
  fechaRegistro: string; // Mantiene el nombre original del frontend
}

// Función para convertir datos del backend al frontend
const mapBackendToFrontend = (backendAnimal: AnimalBackend): Animal => ({
  ...backendAnimal,
  fechaRegistro: backendAnimal.fecha_registro
});

// Interfaz para crear animales (sin id y fechaRegistro)
export interface CreateAnimalRequest {
  nombre: string;
  tipo: string;
  genero: string;
  edad: number;
  region: string;
  descripcion: string;
  imagen: string;
}

// Configuración de la API para React Native
const getApiBaseUrl = () => {
  // Para React Native, necesitamos diferentes URLs según la plataforma
  if (__DEV__) {
    // En desarrollo
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5000/api'; // Emulador Android
    } else if (Platform.OS === 'ios') {
      return 'http://localhost:5000/api'; // Simulador iOS
    } else {
      return 'http://localhost:5000/api'; // Web/Expo
    }
  } else {
    // En producción, usar tu URL real del servidor
    return 'https://tu-servidor.com/api';
  }
};

class AnimalService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${getApiBaseUrl()}/animals`;
  }

  // Método auxiliar para manejar respuestas
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  // Obtener todos los animales
  async getAnimales(): Promise<Animal[]> {
    try {
      const response = await fetch(this.baseUrl);
      const backendAnimales = await this.handleResponse<AnimalBackend[]>(response);
      return backendAnimales.map(mapBackendToFrontend);
    } catch (error) {
      console.error('Error al obtener animales:', error);
      throw new Error(`No se pudieron cargar los animales: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  // Obtener animales por tipo
  async getAnimalesPorTipo(tipo: string): Promise<Animal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tipo/${encodeURIComponent(tipo)}`);
      const backendAnimales = await this.handleResponse<AnimalBackend[]>(response);
      return backendAnimales.map(mapBackendToFrontend);
    } catch (error) {
      console.error('Error al filtrar animales por tipo:', error);
      throw new Error(`No se pudieron filtrar los animales: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  // Obtener un animal por ID
  async getAnimalPorId(id: number): Promise<Animal> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const backendAnimal = await this.handleResponse<AnimalBackend>(response);
      return mapBackendToFrontend(backendAnimal);
    } catch (error) {
      console.error('Error al obtener animal por ID:', error);
      throw new Error(`No se pudo cargar el animal: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  // Crear un nuevo animal
  async insertAnimal(animal: CreateAnimalRequest): Promise<{ message: string; id: number }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animal),
      });
      return await this.handleResponse<{ message: string; id: number }>(response);
    } catch (error) {
      console.error('Error al crear animal:', error);
      throw new Error(`No se pudo crear el animal: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  // Actualizar un animal
  async updateAnimal(id: number, animal: CreateAnimalRequest): Promise<{ message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animal),
      });
      return await this.handleResponse<{ message: string }>(response);
    } catch (error) {
      console.error('Error al actualizar animal:', error);
      throw new Error(`No se pudo actualizar el animal: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  // Eliminar un animal
  async deleteAnimal(id: number): Promise<{ message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });
      return await this.handleResponse<{ message: string }>(response);
    } catch (error) {
      console.error('Error al eliminar animal:', error);
      throw new Error(`No se pudo eliminar el animal: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  // Método para probar la conexión con el backend
  async testConnection(): Promise<{ message: string; timestamp: string }> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/test`);
      return await this.handleResponse<{ message: string; timestamp: string }>(response);
    } catch (error) {
      console.error('Error al probar conexión:', error);
      throw new Error(`No se pudo conectar con el servidor: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }
}

// Singleton para usar en toda la aplicación
export const animalService = new AnimalService();