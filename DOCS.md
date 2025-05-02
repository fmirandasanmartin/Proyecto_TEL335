# Documentación Técnica - PetMatch

## Módulo de Filtrado de Animales

### Estructura del Proyecto
frontend/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx    # Página de inicio
│   └── catalogo.tsx     # Pantalla de catálogo con filtro
├── components/
│   └── AnimalCard.tsx   # Componente para mostrar cada animal
├── database/
│   └── Database.ts      # Configuración de AsyncStorage
├── hooks/
│   └── useAnimales.ts   # Hook personalizado para filtrado
└── assets/              # Imágenes y recursos estáticos

### Modelo de Datos

```typescript
interface Animal {
  id: number;            // Identificador único
  nombre: string;        // Nombre del animal
  tipo: string;          // Tipo (perro/gato)
  genero: string;        // Género (macho/hembra)
  edad: number;          // Edad en años
  region: string;        // Región geográfica
  descripcion: string;   // Descripción del animal
  imagen: string;        // URL de la imagen
  fechaRegistro: string; // Fecha ISO de registro
}
Componentes Principales
Database.ts

Implementa AnimalRepository como singleton para gestionar la persistencia
Utiliza AsyncStorage para almacenar datos localmente
Proporciona métodos CRUD para animales
Inicializa datos de ejemplo en la primera ejecución

useAnimales.ts

Hook personalizado que maneja la lógica de filtrado
Gestiona estados: animales, cargando, error
Actualiza resultados automáticamente cuando cambia el tipo seleccionado
Maneja la limpieza cuando el componente se desmonta

AnimalCard.tsx

Componente de presentación para mostrar un animal
Muestra imagen, nombre, tipo, género, edad y región
Estilizado con tarjetas y sombras para mejorar la UI
Capitaliza automáticamente tipo y género para mejor presentación

catalogo.tsx

Pantalla principal de filtrado
Implementa selector (Picker) para filtrar por tipo
Muestra resultado como lista de tarjetas (FlatList)
Incluye estados de carga y manejo de errores
Contador de resultados encontrados

Flujo de Datos

El usuario inicia la aplicación y navega a la pantalla de catálogo
La app verifica si hay datos en AsyncStorage

Si no hay datos, se insertan animales de ejemplo
Si hay datos, se cargan los existentes


Se muestran todos los animales inicialmente
El usuario selecciona un tipo de animal en el selector
Se activa el hook useAnimales con el nuevo valor
Se filtran los resultados según el tipo seleccionado
Se actualiza la lista con los animales que coinciden

Implementación Técnica
Almacenamiento en AsyncStorage
typescript// Clave utilizada para almacenar datos
const STORAGE_KEY = 'animales_data';

// Guardado de datos
await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(animales));

// Recuperación de datos
const data = await AsyncStorage.getItem(STORAGE_KEY);
if (data) {
  return JSON.parse(data);
}
Filtrado de Datos
typescript// Filtrar por tipo
async getAnimalesPorTipo(tipo: string): Promise<Animal[]> {
  try {
    const animales = await this.getAnimales();
    return animales.filter(animal => animal.tipo === tipo);
  } catch (error) {
    console.error('Error al filtrar animales por tipo:', error);
    return [];
  }
}
Navegación
typescript// Navegación desde la página de inicio al catálogo
const handlePress = () => {
  router.push('/catalogo');
};
Extensibilidad
El módulo está diseñado para ser fácilmente extendido:

Añadir más filtros:

Agregar métodos adicionales en AnimalRepository (ej: getAnimalesPorRegion)
Ampliar el hook useAnimales para aceptar más parámetros
Añadir controles adicionales en la pantalla de catálogo


Integración con API:

Agregar métodos en AnimalRepository para sincronizar con API externa
Implementar lógica de fusión de datos locales y remotos
Añadir manejo de caché y conexión intermitente


Funcionalidades Futuras:

Sistema de favoritos: marcar animales de interés
Visualización detallada: pantalla con información completa
Formulario de contacto: solicitud de adopción



Pruebas y Depuración
Para probar el módulo:

Verificar inicialización:

Borrar datos de AsyncStorage y reiniciar la app
Comprobar que se cargan los datos de ejemplo


Probar filtrado:

Seleccionar "Perros" y verificar que solo aparecen perros
Seleccionar "Gatos" y verificar que solo aparecen gatos
Seleccionar "Todos" y verificar que aparecen todos los animales


Depuración común:

Si no aparecen datos: verificar consola para errores
Si el filtro no funciona: verificar que los animales tienen el campo tipo correcto
Si hay problemas de rendimiento: implementar paginación para grandes conjuntos de datos



Consideraciones y Mejores Prácticas

Rendimiento:

AsyncStorage es adecuado para conjuntos de datos pequeños/medianos
Para datos grandes, considerar implementar paginación
Usar FlatList con windowSize y maxToRenderPerBatch optimizados


Seguridad:

No almacenar información sensible en AsyncStorage
Validar datos antes de almacenarlos


Experiencia de Usuario:

Mostrar indicadores de carga durante operaciones
Proporcionar mensajes claros en caso de error
Mantener la interfaz responsiva incluso durante operaciones de datos


Mantenimiento:

Mantener la separación de responsabilidades
Documentar componentes y funciones
Seguir convenciones de nombres consistentes