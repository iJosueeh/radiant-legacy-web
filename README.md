# 💎 Radiant Legacy

**Radiant Legacy** es una aplicación web de joyería moderna y con todas las funciones, creada con **React.js** para el front-end y un **API REST de Spring Boot** para el back-end. El proyecto ofrece una experiencia de compra completa, elegante y receptiva, que permite a los usuarios explorar productos, gestionar sus cuentas y realizar pedidos, mientras que los administradores tienen un panel potente para gestionar todos los aspectos de la tienda.

---

## ✨ Funcionalidades Principales

### Para Clientes
- **Autenticación de Usuarios**: Registro e inicio de sesión seguros con gestión de sesiones basada en contexto.
- **Catálogo de Productos**: Explora productos por categorías con imágenes y descripciones detalladas.
- **Carrito de Compras**: Añade productos al carrito, ajusta cantidades y revisa el resumen antes de comprar.
- **Gestión de Pedidos**: Realiza pedidos con diferentes tipos de envío y revisa el historial de compras.
- **Reseñas y Calificaciones**: Deja comentarios y valoraciones sobre los productos, y edita o elimina tus propias reseñas.
- **Citas**: Agenda citas para atención personalizada, ya sea de forma presencial o virtual.
- **Panel de Usuario**: Gestiona tu perfil, revisa tus pedidos, reseñas e historial de productos vistos.

### Para Administradores
- **Panel de Administración Completo**: Un dashboard centralizado para gestionar toda la plataforma.
- **Gestión de Usuarios**: Activa, desactiva, edita y elimina perfiles de usuario.
- **Gestión de Productos**: Agrega, edita y elimina productos del catálogo, gestionando stock, precios y más.
- **Gestión de Pedidos**: Procesa, cancela y visualiza los detalles de los pedidos de los clientes.
- **Gestión de Citas**: Administra y atiende las citas agendadas por los usuarios.
- **Moderación de Reseñas**: Aprueba o rechaza las reseñas enviadas por los clientes.
- **Registro de Acciones (Logs)**: Visualiza un historial de todas las acciones importantes realizadas en el panel de administración, con la capacidad de deshacer la última acción.

---

## 🚀 Cómo Probarlo Localmente

### Requisitos Previos
- **Node.js** (v18 o superior)
- **npm** o **yarn**

### 1️⃣ Configuración del Front-End (React)
1.  **Clona este repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/radiant-legacy-web.git
    cd radiant-legacy-web/radiant-legacy
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecuta la aplicación:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

### 2️⃣ Configuración del Back-End (Spring Boot)
*Las instrucciones para ejecutar el API de Spring Boot se añadirán próximamente. Por ahora, la aplicación front-end se conecta a un API desplegada en `http://localhost:8080`.*

---

## 🛠️ Tecnologías Usadas

### Front-End
- **React.js + Vite**: Para una experiencia de desarrollo rápida y moderna.
- **React Router v6**: Para el enrutamiento del lado del cliente.
- **Bootstrap 5 y CSS Personalizado**: Para un diseño elegante y receptivo.
- **Context API**: Para la gestión del estado global (autenticación, carga).
- **Axios**: Para realizar peticiones HTTP al API de back-end.
- **SweetAlert2**: Para notificaciones y alertas interactivas.

### Back-End
- **Spring Boot**: Framework robusto para crear el API REST.
- **Spring Security**: Para la gestión de autenticación y autorización.
- **JPA (Hibernate)**: Para el mapeo objeto-relacional y la interacción con la base de datos.
- **SQL Server**: Como sistema de gestión de bases de datos.
