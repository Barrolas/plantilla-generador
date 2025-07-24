# Sistema de Nivelación de Recursos (SNR) v2.0 - Plantilla

Una plantilla completa y reutilizable para crear juegos incrementales (idle games) con HTML, CSS y JavaScript vanilla, ahora con **sistema de instalaciones/edificios**.

## 🎮 Características

- **Recurso base** con generación automática por segundo
- **3 instalaciones mejorables** con efectos únicos
- **4 niveles de recursos jerárquicos** con progresión automática
- **Sistema de niveles** para instalaciones con costos escalables
- **Generación pasiva** de recursos por segundo
- **Sistema de desbloqueo** progresivo
- **Interfaz moderna** con tema oscuro y animaciones suaves
- **Sistema de logros** integrado
- **Guardado automático** en localStorage
- **Responsive design** para móviles y desktop
- **Fácil personalización** para diferentes temáticas

## 📁 Estructura del Proyecto

```
plantilla-generador/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos personalizados
├── js/
│   └── game.js        # Lógica del juego
├── config.js          # Configuración y temas
└── README.md          # Esta documentación
```

## 🚀 Cómo Usar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador
2. **Recolectar**: Haz clic en el botón para recolectar Materia Prima
3. **Mejorar**: Compra mejoras en las instalaciones para aumentar producción
4. **Desbloquear**: Desbloquea nuevos recursos gastando MP
5. **Progresar**: Las instalaciones mejoran automáticamente tu producción

## 🏭 Sistema de Instalaciones

### Instalaciones Disponibles

| Instalación | Efecto | Costo Inicial | Multiplicador | Nivel Máximo |
|-------------|--------|---------------|---------------|--------------|
| **Fábrica de Producción** | +0.5 MP/seg por nivel | 10 MP | 1.15x | 50 |
| **Centro de Recolección** | +1 MP por clic por nivel | 25 MP | 1.2x | 30 |
| **Sistema de Optimización** | +10% multiplicador global por nivel | 100 MP | 1.5x | 20 |

### Mecánica de Mejoras

- **Costo escalable**: Cada mejora cuesta más que la anterior
- **Efectos acumulativos**: Los efectos se suman con cada nivel
- **Límites**: Cada instalación tiene un nivel máximo
- **Sinergias**: Las instalaciones trabajan juntas para maximizar producción

## 🎯 Mecánicas del Juego

### Recurso Base
- **Materia Prima (MP)**: Recurso fundamental que se genera automáticamente
- **Generación base**: 1.0 MP por segundo
- **Clic manual**: +5 MP por clic (mejorable)

### Recursos Jerárquicos

| Nivel | Recurso | Icono | Tasa Base | Por Clic | Costo Desbloqueo |
|-------|---------|-------|-----------|----------|------------------|
| Base | Materia Prima (MP) | ⚙️ | 1.0/seg | +5 | - |
| 2 | Componentes Ensamblados (CE) | 🎛️ | 0.1/seg | +1 | 100 MP |
| 3 | Unidades Complejas (UC) | 🧠 | 0.01/seg | +0.1 | 100 MP |
| 4 | Núcleos Sintéticos (NS) | ⚛️ | 0.001/seg | +0.01 | 100 MP |

### Progresión

1. **Inicio**: Solo Materia Prima está disponible
2. **Mejoras**: Compra instalaciones para aumentar producción
3. **Desbloqueo**: Gasta MP para desbloquear nuevos recursos
4. **Escalado**: Las instalaciones multiplican toda la producción
5. **Automatización**: Los recursos se generan automáticamente

## 🎨 Personalización

### Cambiar Temática

Para adaptar el juego a una nueva temática, modifica `config.js`:

```javascript
// Ejemplo: Tema de Ciencia
window.ScienceTheme = {
    baseResource: {
        name: 'Átomos',
        short: 'AT',
        icon: 'fa-atom',
        color: 'primary',
        baseRate: 1.0,
        clickAmount: 5
    },
    resources: {
        molecules: { name: 'Moléculas', short: 'ML', icon: 'fa-dna', color: 'info', baseRate: 0.1, clickAmount: 1, unlockCost: 100 },
        // ... más recursos
    },
    installations: {
        lab: { name: 'Laboratorio', description: 'Aumenta producción de átomos', icon: 'fa-flask', color: 'primary', baseCost: 10, costMultiplier: 1.15, effect: 'baseRate', effectAmount: 0.5, maxLevel: 50 },
        // ... más instalaciones
    }
};
```

### Añadir Nuevas Instalaciones

```javascript
nuevaInstalacion: {
    name: 'Tu Nueva Instalación',
    description: 'Descripción de la instalación',
    icon: 'fa-tu-icono',
    color: 'warning',
    baseCost: 50,
    costMultiplier: 1.25,
    effect: 'tuEfecto',        // 'baseRate', 'clickAmount', 'globalMultiplier'
    effectAmount: 0.2,
    maxLevel: 25
}
```

### Modificar Balance

Edita los valores en `config.js`:

- `baseRate`: Generación base por segundo
- `clickAmount`: Cantidad por clic manual
- `baseCost`: Costo inicial de instalación
- `costMultiplier`: Multiplicador de costo por nivel
- `effectAmount`: Cuánto mejora por nivel
- `maxLevel`: Nivel máximo de la instalación

## 🔧 Configuración Avanzada

### Efectos de Instalaciones

- **`baseRate`**: Aumenta la generación por segundo del recurso base
- **`clickAmount`**: Aumenta la cantidad obtenida por clic manual
- **`globalMultiplier`**: Multiplica toda la producción por un factor

### Intervals (Intervalos)

```javascript
intervals: {
    saveInterval: 5000,    // Guardar cada 5 segundos
    updateInterval: 100,   // Actualizar UI cada 100ms
    gameInterval: 1000     // Actualizar recursos cada 1 segundo
}
```

### Logros Personalizados

```javascript
{
    id: 'tu_logro',
    name: 'Nombre del Logro',
    description: 'Descripción del logro',
    icon: 'fa-tu-icono',
    condition: (gameState) => tuCondicion(gameState)
}
```

## 📱 Responsive Design

El juego está optimizado para:
- **Desktop**: 4 columnas de recursos, instalaciones en fila
- **Tablet**: 2 columnas de recursos, instalaciones apiladas
- **Móvil**: 1 columna de recursos, instalaciones apiladas

## 💾 Sistema de Guardado

- **Guardado automático**: Cada 5 segundos
- **Guardado manual**: Botón "Guardar"
- **Carga automática**: Al abrir la página
- **Reinicio**: Botón "Reiniciar" con confirmación

## 🎯 Logros Incluidos

1. **Primer Clic**: Haz tu primer clic
2. **Maestro de Materia Prima**: Acumula 1,000 MP
3. **Primera Mejora**: Mejora una instalación por primera vez
4. **Maestro de Producción**: Llega al nivel 10 en Fábrica de Producción
5. **Maestro Clicker**: Haz 1,000 clics
6. **Optimizador**: Llega al nivel 5 en Sistema de Optimización

## 🔍 Debug y Desarrollo

### Consola del Navegador

```javascript
// Ver estado del juego
console.log(window.snrGame.gameState);

// Modificar recursos (para testing)
window.snrGame.gameState.baseResource.amount = 1000;

// Forzar guardado
window.snrGame.saveGame();

// Cambiar tema
changeTheme('Science');
```

### Variables Globales

- `window.snrGame`: Instancia principal del juego
- `window.SNRGame`: Clase del juego
- `window.SNRConfig`: Configuración global
- `changeTheme(themeName)`: Cambiar tema completo

## 🚀 Despliegue

### Servidor Local

```bash
# Python 3
python -m http.server 8000

# Node.js (con http-server)
npx http-server

# PHP
php -S localhost:8000
```

### Hosting Estático

El proyecto es 100% estático y puede desplegarse en:
- GitHub Pages
- Netlify
- Vercel
- Cualquier hosting de archivos estáticos

## 📋 Checklist de Personalización

Para crear tu propio juego incremental:

- [ ] Cambiar nombres de recursos en `config.js`
- [ ] Actualizar iconos de Font Awesome
- [ ] Modificar colores en CSS variables
- [ ] Ajustar tasas y costos según balance
- [ ] Personalizar instalaciones y sus efectos
- [ ] Añadir logros temáticos
- [ ] Personalizar animaciones si es necesario
- [ ] Probar en diferentes dispositivos

## 🎨 Temáticas Sugeridas

### Temas Predefinidos

- **Ciencia**: Átomos → Moléculas → Células → Organismos
- **Tecnología**: Bits → Bytes → Kilobytes → Megabytes
- **Naturaleza**: Semillas → Plantas → Árboles → Bosques
- **Espacio**: Polvo → Planetas → Estrellas → Galaxias
- **Cocina**: Ingredientes → Platos → Menús → Restaurantes

### Instalaciones por Tema

| Tema | Instalación 1 | Instalación 2 | Instalación 3 |
|------|---------------|---------------|---------------|
| Ciencia | Laboratorio | Microscopio | Acelerador |
| Tecnología | Procesador | Memoria RAM | Red |
| Naturaleza | Invernadero | Sistema de Riego | Ecosistema |
| Espacio | Telescopio | Satélite | Agujero de Gusano |
| Cocina | Cocina | Chef | Franquicia |

## 📄 Licencia

Esta plantilla es de uso libre para proyectos personales y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para mejorar la plantilla:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Para dudas o sugerencias sobre la plantilla, puedes:
- Abrir un issue en el repositorio
- Contactar al desarrollador
- Revisar la documentación de Bootstrap y Font Awesome

---

**Versión**: 2.0  
**Fecha**: 2025  
**Tecnologías**: HTML5, CSS3, JavaScript ES6+, Bootstrap 5, Font Awesome 6  
**Nueva Característica**: Sistema de Instalaciones/Edificios con niveles mejorables 