// hooks/useAnimales.ts
import { useState, useEffect } from 'react';
import { animalRepository, Animal } from '../database/Database';

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
          resultados = await animalRepository.getAnimalesPorTipo(tipo);
        } else {
          // Si no hay tipo, obtenemos todos
          resultados = await animalRepository.getAnimales();
        }
        
        if (mounted) {
          setAnimales(resultados);
        }
      } catch (err) {
        console.error('Error al cargar animales:', err);
        if (mounted) {
          setError('Hubo un error al cargar los animales. Por favor, intenta de nuevo.');
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

  return { animales, cargando, error };
}