# Sistema de Nivelación de Recursos (SNR) v3.0

## 🎮 **Descripción**

Sistema de Nivelación de Recursos (SNR) es un juego incremental/clicker que simula la gestión de recursos en una cadena de producción industrial. El proyecto está implementado en **React** con Custom Hooks y Vite para máxima reactividad y performance.

## 🚀 **Características Principales**

### **Mecánicas del Juego**
- ✅ **Recurso Base**: Materia Prima (MP) - generación automática y manual
- ✅ **Recursos Jerárquicos**: CE, UC, NS - desbloqueables progresivamente
- ✅ **Sistema de Instalaciones**: 3 tipos de mejoras con efectos específicos
- ✅ **Logros**: Sistema de achievements con condiciones dinámicas
- ✅ **Guardado Automático**: Persistencia de datos en localStorage
- ✅ **Reactividad Nativa**: Actualizaciones en tiempo real sin recargas

### **Instalaciones Disponibles**
1. **Fábrica de Producción**: Aumenta la producción de MP por segundo
2. **Centro de Recolección**: Aumenta la cantidad de MP por clic
3. **Sistema de Optimización**: Multiplicador global de toda la producción

## 📁 **Estructura del Proyecto**

```
plantilla-generador/
├── package.json              # Dependencias React
├── vite.config.js            # Configuración Vite
├── index.html                # Template HTML React
├── src/
│   ├── main.jsx             # Punto de entrada React
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos específicos React
│   ├── index.css            # Estilos globales
│   ├── hooks/
│   │   └── useGameState.js  # Hook personalizado del juego
│   └── utils/
│       └── config.js        # Configuración del juego
└── README.md                # Este archivo
```

## ⚛️ **Tecnologías Utilizadas**

- **React 18**: Biblioteca de UI con hooks modernos
- **Vite**: Build tool rápido para desarrollo
- **Custom Hooks**: `useGameState` para lógica del juego
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **Font Awesome 6**: Iconografía moderna
- **LocalStorage**: Persistencia de datos del juego

## 🛠️ **Instalación y Uso**

### **Requisitos Previos**
- Node.js (versión 16 o superior)
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd plantilla-generador

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en:
# http://localhost:3000
```

### **Comandos Disponibles**
```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## 🎨 **Características de UX/UI**

### **Diseño Responsivo**
- ✅ Adaptable a móviles y tablets
- ✅ Interfaz oscura moderna
- ✅ Animaciones suaves y feedback visual
- ✅ Reactividad nativa automática

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
El juego es altamente configurable a través de `src/utils/config.js`:

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
  "version": "3.0",
  "saveTime": 1640995200000
}
```

## 🚀 **Desarrollo**

### **Arquitectura React**
- **Componentes Funcionales**: Uso de hooks modernos
- **Custom Hook**: `useGameState` centraliza toda la lógica del juego
- **Estado Reactivo**: Actualizaciones automáticas en tiempo real
- **Performance Optimizada**: Memoización con `useCallback`

### **Comandos Útiles**
```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Ver diferencias
git diff
```

## 🎯 **Estado Actual del Proyecto**

### **✅ Funcionalidades Completadas**
- ✅ **Sistema de Recursos**: Base y jerárquicos funcionando
- ✅ **Sistema de Instalaciones**: 3 tipos con efectos específicos
- ✅ **Sistema de Logros**: Condiciones dinámicas y persistencia
- ✅ **Guardado Automático**: localStorage con versionado
- ✅ **Reactividad Nativa**: Actualizaciones automáticas
- ✅ **Migración Completa**: Solo versión React optimizada
- ✅ **Errores Corregidos**: achievement.condition y desbloqueo de recursos

### **🎮 Versión Funcionando**
- ✅ **Versión React**: Reactiva, optimizada y estable
- ✅ **Performance**: Reactividad nativa sin recargas
- ✅ **Compatibilidad**: Funciona en navegadores modernos

### **🔧 Problemas Resueltos Recientemente**
- ✅ **Error de Logros**: `achievement.condition is not a function` - **SOLUCIONADO**
- ✅ **Desbloqueo de Recursos**: Botones no se habilitaban - **SOLUCIONADO**
- ✅ **Reactividad**: Actualizaciones en tiempo real - **IMPLEMENTADO**
- ✅ **Persistencia**: Carga correcta desde localStorage - **CORREGIDO**
- ✅ **Migración Limpia**: Eliminación de versión vanilla - **COMPLETADO**

### **📊 Métricas de Éxito**
- ✅ **Funcionalidad**: 100% de características implementadas
- ✅ **Estabilidad**: Sin errores críticos conocidos
- ✅ **Performance**: Reactividad nativa automática
- ✅ **Compatibilidad**: Funciona en navegadores modernos
- ✅ **Mantenibilidad**: Código React modular y limpio

## 🚀 **Próximos Pasos Planificados**

### **📋 Fase 1: Mejoras Inmediatas (Prioridad Alta)**
- 🔧 **Testing Completo**: Verificar en diferentes navegadores
- 📊 **Métricas de Performance**: Medir y optimizar tiempos de respuesta
- 🐛 **Bug Fixes**: Identificar y corregir problemas menores
- 📚 **Documentación Técnica**: Guías de desarrollo y API

### **📋 Fase 2: Nuevas Funcionalidades (Prioridad Media)**
- 🔄 **Sistema de Notificaciones**: Alertas para logros y eventos
- 🔊 **Efectos de Sonido**: Audio para acciones del usuario
- 📈 **Gráficos Estadísticos**: Visualización de progreso
- 🌐 **Soporte Multiidioma**: Internacionalización (i18n)
- 📱 **PWA (Progressive Web App)**: Instalación como app nativa

### **📋 Fase 3: Optimizaciones Avanzadas (Prioridad Baja)**
- ⚡ **Performance**: Optimización de re-renderizados en React
- 🧪 **Testing**: Tests unitarios y de integración
- 📦 **Build de Producción**: Configuración optimizada
- 🚀 **Deployment**: Despliegue automático con CI/CD
- 🎨 **Temas Avanzados**: Más opciones de personalización

### **📋 Fase 4: Expansión del Juego (Futuro)**
- 🏭 **Nuevas Instalaciones**: Más tipos de mejoras
- 🌍 **Eventos Especiales**: Contenido temporal
- 👥 **Modo Multiplayer**: Competencia entre jugadores
- 📊 **Leaderboards**: Rankings y estadísticas globales
- 🎯 **Misiones**: Objetivos específicos con recompensas

## 📝 **Changelog**

### **v3.0.0 - Migración Completa a React**
- ✅ **Migración Limpia**: Eliminación de versión vanilla
- ✅ **Estructura Optimizada**: Solo versión React en raíz
- ✅ **README Actualizado**: Documentación para versión única
- ✅ **Control de Versiones**: Git organizado para React
- ✅ **Performance**: Reactividad nativa automática
- ✅ **Mantenibilidad**: Código modular y limpio

### **v2.0.1 - Correcciones y Mejoras**
- ✅ **Fix**: Corregido error `achievement.condition is not a function`
- ✅ **Fix**: Corregido sistema de desbloqueo de recursos jerárquicos
- ✅ **Improvement**: Restauración de funciones al cargar desde localStorage
- ✅ **Update**: README actualizado con estado actual y próximos pasos
- ✅ **Git**: Control de versiones organizado con ramas

### **v2.0.0 - React Migration**
- ✅ Migración completa a React con Custom Hooks
- ✅ Reactividad nativa automática
- ✅ Componentes modulares
- ✅ Mejor performance y mantenibilidad
- ✅ Herramientas de desarrollo avanzadas
- ✅ Sistema de instalaciones con 3 tipos de mejoras
- ✅ Sistema de logros con condiciones dinámicas

### **v1.0.0 - Versión Vanilla**
- ✅ Sistema base de recursos (Materia Prima)
- ✅ Recursos jerárquicos (CE, UC, NS)
- ✅ Instalaciones y mejoras (3 tipos)
- ✅ Sistema de logros con persistencia
- ✅ Guardado automático en localStorage
- ✅ Diseño responsivo y accesible
- ✅ Aplicación de heurísticas de Nielsen

## 🤝 **Contribución**

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'feat: Añadir nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 **Agradecimientos**

- **React**: Biblioteca de UI moderna
- **Vite**: Herramienta de build rápida
- **Bootstrap 5**: Framework CSS
- **Font Awesome 6**: Iconografía
- **Nielsen Heuristics**: Principios de UX

---

**Desarrollado con ❤️ para la comunidad de desarrolladores de juegos incrementales** 