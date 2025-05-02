# 🐾 Plataforma de Adopción de Animales

## 📌 Descripción
Esta aplicación permite conectar a **refugios, rescatistas y adoptantes** para facilitar la **adopción de animales en situación de calle**. Proporciona una plataforma segura y organizada donde los usuarios pueden **buscar, filtrar y contactar refugios** de manera eficiente.

Además, la aplicación **almacena su propia base de datos** de animales registrados por usuarios y también **obtiene información de la API de Huachitos** para complementar el catálogo de adopción.

## 🚀 Características Principales
* 📍 **Búsqueda Avanzada**: Filtra por **tipo de animal, género, región y estado**.
* 🏡 **Registro de Animales**: Permite a refugios y rescatistas publicar animales en adopción en la **base de datos propia**.
* 🔄 **Integración con API Huachitos**: Obtiene datos de animales publicados en la API de Huachitos.
* 📊 **Panel de Gestión**: Historial de actividad, seguimiento de adopciones y registro de acciones.
* 📢 **Marketing y Visibilidad**: Integración con redes sociales y campañas de adopción.

## 🔍 Módulo de Filtrado de Animales (Implementado)
Se ha implementado el módulo de filtrado por tipo de animal (perros/gatos) con las siguientes características:

* 💾 **Base de datos local** utilizando AsyncStorage para almacenamiento persistente
* 📱 **Interfaz intuitiva** con selector de tipo y visualización en tarjetas
* 🎨 **Componentes visuales personalizados** para mostrar la información de cada animal
* ⚙️ **Gestión de estados** de carga y manejo de errores
* 🔄 **Hook personalizado** `useAnimales` para la lógica de filtrado

Este módulo representa el primer paso para la implementación completa de la búsqueda avanzada y permite a los usuarios ver solo los animales del tipo que les interesa, mejorando la experiencia de uso.

## 📡 API Endpoints (Huachitos)
| **Método** | **Endpoint** | **Descripción** |
|------------|--------------|-----------------|
| GET | `/animales` | Lista de animales disponibles en adopción desde la API de Huachitos |
| GET | `/animales/{id}` | Obtiene información detallada de un animal desde Huachitos |
| GET | `/equipos` | Lista de refugios y rescatistas registrados en Huachitos |
| GET | `/equipos/{id}` | Información detallada de un refugio en Huachitos |

## 📡 API Endpoints (Base de Datos Propia)
| **Método** | **Endpoint** | **Descripción** |
|------------|--------------|-----------------|
| GET | `/animales` | Lista los animales almacenados en nuestra base de datos |
| GET | `/animales/{id}` | Obtiene información detallada de un animal registrado |
| POST | `/animales` | Agrega un nuevo animal a nuestra base de datos (requiere autenticación) |
| POST | `/animales/{id}/imagen` | Permite subir una imagen de un animal |
| GET | `/equipos` | Lista los refugios y rescatistas registrados en nuestra base de datos |
| GET | `/equipos/{id}` | Obtiene información detallada de un refugio |

## 💻 Tecnologías Utilizadas
* **Frontend**: React Native con Expo (TypeScript)
* **Almacenamiento**: AsyncStorage para datos locales
* **UI/UX**: Componentes personalizados y biblioteca Picker
* **Manejo de Estado**: Hooks de React (useState, useEffect)

## 🚀 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/plataforma-adopcion-animales.git

# Instalar dependencias del frontend
cd frontend
npm install

# Iniciar la aplicación
npx expo start