// hooks/useAnimales.ts
import { useState, useEffect } from 'react';
import { animalService, Animal } from '../services/AnimalService';

export function useAnimales(tipo: string = '') {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true; // Para evitar actualizar un componente desmontado
    
    async function cargarAnimales() {
      if (!mounted) return;
      
      setCargando(true);
      setError(null);
      
      try {
        let resultados: Animal[];
        
        // Si hay un tipo seleccionado, filtramos por ese tipo
        if (tipo) {
          resultados = await animalService.getAnimalesPorTipo(tipo);
        } else {
          // Si no hay tipo, obtenemos todos
          resultados = await animalService.getAnimales();
        }
        
        if (mounted) {
          setAnimales(resultados);
        }
      } catch (err) {
        console.error('Error al cargar animales:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Hubo un error al cargar los animales. Por favor, intenta de nuevo.');
        }
      } finally {
        if (mounted) {
          setCargando(false);
        }
      }
    }
    
    cargarAnimales();
    
    return () => {
      mounted = false; // Limpieza cuando el componente se desmonta
    };
  }, [tipo]);

  // Función para recargar los datos manualmente
  const recargar = async () => {
    setCargando(true);
    setError(null);
    
    try {
      let resultados: Animal[];
      
      if (tipo) {
        resultados = await animalService.getAnimalesPorTipo(tipo);
      } else {
        resultados = await animalService.getAnimales();
      }
      
      setAnimales(resultados);
    } catch (err) {
      console.error('Error al recargar animales:', err);
      setError(err instanceof Error ? err.message : 'Hubo un error al cargar los animales. Por favor, intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return { animales, cargando, error, recargar };
}