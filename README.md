# Sistema de Nivelación de Recursos (SNR) v2.0

## 🎮 **Descripción**

Sistema de Nivelación de Recursos (SNR) es un juego incremental/clicker que simula la gestión de recursos en una cadena de producción industrial. El proyecto incluye **dos implementaciones**:

- **Versión Vanilla**: HTML + CSS + JavaScript puro
- **Versión React**: React + Custom Hooks + Vite

## 🚀 **Características Principales**

### **Mecánicas del Juego**
- ✅ **Recurso Base**: Materia Prima (MP) - generación automática y manual
- ✅ **Recursos Jerárquicos**: CE, UC, NS - desbloqueables progresivamente
- ✅ **Sistema de Instalaciones**: 3 tipos de mejoras con efectos específicos
- ✅ **Logros**: Sistema de achievements con condiciones dinámicas
- ✅ **Guardado Automático**: Persistencia de datos en localStorage

### **Instalaciones Disponibles**
1. **Fábrica de Producción**: Aumenta la producción de MP por segundo
2. **Centro de Recolección**: Aumenta la cantidad de MP por clic
3. **Sistema de Optimización**: Multiplicador global de toda la producción

## 📁 **Estructura del Proyecto**

```
plantilla-generador/
├── index.html              # Versión Vanilla - Página principal
├── css/style.css           # Versión Vanilla - Estilos
├── js/game.js             # Versión Vanilla - Lógica del juego
├── config.js              # Versión Vanilla - Configuración
├── react-version/         # Versión React - Carpeta completa
│   ├── package.json       # Dependencias React
│   ├── vite.config.js     # Configuración Vite
│   ├── index.html         # Template HTML React
│   └── src/
│       ├── main.jsx       # Punto de entrada React
│       ├── App.jsx        # Componente principal
│       ├── App.css        # Estilos específicos React
│       ├── index.css      # Estilos globales React
│       ├── hooks/
│       │   └── useGameState.js  # Hook personalizado
│       ├── utils/
│       │   └── config.js        # Configuración React
│       └── components/          # Componentes (futuro)
└── README.md              # Este archivo
```

## 🎯 **Versiones Disponibles**

### **🌐 Versión Vanilla (HTML + CSS + JS)**
- **Ubicación**: Archivos en la raíz del proyecto
- **Ejecución**: Abrir `index.html` en el navegador
- **Ventajas**: 
  - ✅ Sin dependencias externas
  - ✅ Funciona offline
  - ✅ Fácil de entender y modificar
  - ✅ Compatible con cualquier navegador

### **⚛️ Versión React (React + Hooks + Vite)**
- **Ubicación**: Carpeta `react-version/`
- **Ejecución**: `npm run dev` (puerto 3000)
- **Ventajas**:
  - ✅ Reactividad nativa automática
  - ✅ Componentes modulares
  - ✅ Mejor performance
  - ✅ Herramientas de desarrollo avanzadas
  - ✅ Código más mantenible

## 🛠️ **Instalación y Uso**

### **Para la Versión Vanilla:**
```bash
# No requiere instalación
# Simplemente abre index.html en tu navegador
```

### **Para la Versión React:**
```bash
# Navegar a la carpeta React
cd react-version

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en:
# http://localhost:3000
```

## 🎨 **Características de UX/UI**

### **Diseño Responsivo**
- ✅ Adaptable a móviles y tablets
- ✅ Interfaz oscura moderna
- ✅ Animaciones suaves y feedback visual

### **Accesibilidad (A11y)**
- ✅ Navegación por teclado
- ✅ Soporte para lectores de pantalla
- ✅ Alto contraste para mejor legibilidad
- ✅ Atajos de teclado (Espacio para recolectar)

### **Heurísticas de Nielsen Aplicadas**
1. **Visibilidad del estado del sistema**: Feedback inmediato
2. **Correspondencia sistema-mundo real**: Iconos familiares
3. **Control y libertad del usuario**: Botones claros
4. **Consistencia y estándares**: UI uniforme
5. **Prevención de errores**: Estados deshabilitados claros
6. **Reconocimiento en lugar de recuerdo**: Información visible
7. **Flexibilidad y eficiencia**: Atajos de teclado
8. **Estética y diseño minimalista**: Interfaz limpia
9. **Ayuda a reconocer errores**: Mensajes claros
10. **Ayuda y documentación**: Tooltips informativos

## 🔧 **Configuración**

### **Archivo de Configuración**
El juego es altamente configurable a través de `config.js` (Vanilla) o `src/utils/config.js` (React):

- ✅ **Recursos**: Nombres, iconos, tasas de generación
- ✅ **Instalaciones**: Costos, efectos, niveles máximos
- ✅ **Logros**: Condiciones personalizables
- ✅ **Temas**: Múltiples temáticas disponibles

### **Temas Disponibles**
- 🧪 **Ciencia**: Átomos → Moléculas → Células
- 💻 **Tecnología**: Bits → Bytes → Kilobytes
- 🌱 **Naturaleza**: Semillas → Plantas → Árboles
- 🌌 **Espacio**: Polvo Cósmico → Planetas → Estrellas
- 👨‍🍳 **Cocina**: Ingredientes → Platos → Restaurantes

## 📊 **Sistema de Guardado**

### **Características**
- ✅ **Guardado automático**: Cada 5 segundos
- ✅ **Guardado manual**: Botón en la interfaz
- ✅ **Carga automática**: Al iniciar el juego
- ✅ **Reseteo**: Función para reiniciar progreso

### **Formato de Datos**
```json
{
  "gameState": {
    "baseResource": { "amount": 1000, "rate": 5.5 },
    "resources": { "ce": { "unlocked": true, "amount": 50 } },
    "installations": { "production": { "level": 3, "cost": 25 } },
    "stats": { "totalClicks": 150, "totalProduction": 5000 },
    "achievements": [ { "id": "first_click", "unlocked": true } ]
  },
  "version": "2.0",
  "saveTime": 1640995200000
}
```

## 🚀 **Desarrollo**

### **Ramas Git**
- **`master`**: Versión vanilla estable
- **`react-migration`**: Versión React completa

### **Comandos Útiles**
```bash
# Ver estado del repositorio
git status

# Cambiar entre versiones
git checkout master          # Versión vanilla
git checkout react-migration # Versión React

# Ver diferencias
git diff master react-migration
```

## 🎯 **Próximas Mejoras**

### **Funcionalidades Planificadas**
- 🔄 **Notificaciones**: Sistema de alertas
- 🔊 **Sonidos**: Efectos de audio
- 📈 **Gráficos**: Estadísticas visuales
- 🌐 **Multiidioma**: Soporte para idiomas
- 📱 **PWA**: Aplicación web progresiva
- 🎨 **Temas**: Más opciones de personalización

### **Optimizaciones Técnicas**
- ⚡ **Performance**: Optimización de re-renderizados
- 🧪 **Testing**: Tests unitarios y de integración
- 📦 **Build**: Configuración de producción
- 🚀 **Deployment**: Despliegue automático

## 📝 **Changelog**

### **v2.0.0 - React Migration**
- ✅ Migración completa a React con Custom Hooks
- ✅ Reactividad nativa automática
- ✅ Componentes modulares
- ✅ Mejor performance y mantenibilidad
- ✅ Herramientas de desarrollo avanzadas

### **v1.0.0 - Versión Vanilla**
- ✅ Sistema base de recursos
- ✅ Instalaciones y mejoras
- ✅ Sistema de logros
- ✅ Guardado automático
- ✅ Diseño responsivo y accesible

## 🤝 **Contribución**

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'feat: Añadir nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 **Agradecimientos**

- **Bootstrap 5**: Framework CSS
- **Font Awesome 6**: Iconografía
- **React**: Biblioteca de UI
- **Vite**: Herramienta de build
- **Nielsen Heuristics**: Principios de UX

---

**Desarrollado con ❤️ para la comunidad de desarrolladores de juegos incrementales** 