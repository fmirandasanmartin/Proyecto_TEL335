# 🐾 Plataforma de Adopción de Animales

## 📌 Descripción
Esta aplicación permite conectar a **refugios, rescatistas y adoptantes** para facilitar la **adopción de animales en situación de calle**. Proporciona una plataforma segura y organizada donde los usuarios pueden **buscar, filtrar y contactar refugios** de manera eficiente.

Además, la aplicación **almacena su propia base de datos** de animales registrados por usuarios y también **obtiene información de la API de Huachitos** para complementar el catálogo de adopción.

## 🚀 Características Principales
- 📍 **Búsqueda Avanzada**: Filtra por **tipo de animal, género, región y estado**.
- 🏡 **Registro de Animales**: Permite a refugios y rescatistas publicar animales en adopción en la **base de datos propia**.
- 🔄 **Integración con API Huachitos**: Obtiene datos de animales publicados en la API de Huachitos.
- 🔐 **Autenticación Segura**: Implementación de **JWT para sesiones seguras**.
- 📊 **Panel de Gestión**: Historial de actividad, seguimiento de adopciones y registro de acciones.
- 📢 **Marketing y Visibilidad**: Integración con redes sociales y campañas de adopción.

## 📡 API Endpoints (Huachitos)
| Método | Endpoint               | Descripción |
|--------|------------------------|-------------|
| GET    | `/animales`            | Lista de animales disponibles en adopción desde la API de Huachitos |
| GET    | `/animales/{id}`       | Obtiene información detallada de un animal desde Huachitos |
| GET    | `/equipos`             | Lista de refugios y rescatistas registrados en Huachitos |
| GET    | `/equipos/{id}`        | Información detallada de un refugio en Huachitos |

📌 **La API de Huachitos solo permite consulta de datos y no modificaciones.**

## 📡 API Endpoints (Base de Datos Propia)
| Método | Endpoint               | Descripción |
|--------|------------------------|-------------|
| GET    | `/animales`            | Lista los animales almacenados en nuestra base de datos |
| GET    | `/animales/{id}`       | Obtiene información detallada de un animal registrado |
| POST   | `/animales`            | Agrega un nuevo animal a nuestra base de datos (requiere autenticación) |
| POST   | `/animales/{id}/imagen` | Permite subir una imagen de un animal |
| GET    | `/equipos`             | Lista los refugios y rescatistas registrados en nuestra base de datos |
| GET    | `/equipos/{id}`        | Obtiene información detallada de un refugio |
| POST   | `/auth/login`          | Iniciar sesión y obtener token JWT |
| POST   | `/auth/register`       | Registrar un nuevo usuario |

📌 **Nuestra plataforma combina datos de nuestra BD con la API de Huachitos para ofrecer un catálogo más completo de animales en adopción.**

🐶 **¡Ayuda a encontrar un hogar para los animales!** 🐾

📌 **Documentación de la API de Huachitos:** [Huachitos API](https://huachitos.cl/docs)
