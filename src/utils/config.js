/**
 * Configuración del Sistema de Nivelación de Recursos (SNR) v2.0 - React
 * 
 * Este archivo contiene todas las configuraciones que puedes modificar
 * para personalizar el juego según tus necesidades.
 */

export const SNRConfig = {
    // ===== CONFIGURACIÓN DEL RECURSO BASE =====
    baseResource: {
        name: 'Materia Prima',
        short: 'MP',
        icon: 'fa-cogs',
        color: 'warning',
        baseRate: 1.0,        // Generación base por segundo
        clickAmount: 5         // Cantidad por clic manual
    },

    // ===== CONFIGURACIÓN DE RECURSOS JERÁRQUICOS =====
    resources: {
        // Nivel 2: Requiere MP
        ce: {
            name: 'Componentes Ensamblados',
            short: 'CE',
            icon: 'fa-sliders-h',
            color: 'info',
            baseRate: 0.1,
            clickAmount: 1,
            unlockCost: 100        // Requiere 100 MP
        },
        
        // Nivel 3: Requiere MP
        uc: {
            name: 'Unidades Complejas',
            short: 'UC',
            icon: 'fa-brain',
            color: 'success',
            baseRate: 0.01,
            clickAmount: 0.1,
            unlockCost: 100        // Requiere 100 MP
        },
        
        // Nivel 4: Requiere MP
        ns: {
            name: 'Núcleos Sintéticos',
            short: 'NS',
            icon: 'fa-atom',
            color: 'danger',
            baseRate: 0.001,
            clickAmount: 0.01,
            unlockCost: 100        // Requiere 100 MP
        }
    },

    // ===== CONFIGURACIÓN DE INSTALACIONES/EDIFICIOS =====
    installations: {
        // Instalación 1: Mejora producción del recurso base
        production: {
            name: 'Fábrica de Producción',
            description: 'Aumenta la producción de Materia Prima por segundo',
            icon: 'fa-industry',
            color: 'primary',
            baseCost: 10,          // Costo inicial
            costMultiplier: 1.15,  // Multiplicador de costo por nivel
            effect: 'baseRate',     // Qué mejora
            effectAmount: 0.5,     // Cuánto mejora por nivel
            maxLevel: 50           // Nivel máximo
        },
        
        // Instalación 2: Mejora cantidad por clic
        clicker: {
            name: 'Centro de Recolección',
            description: 'Aumenta la cantidad de MP obtenida por clic',
            icon: 'fa-hand-point-up',
            color: 'success',
            baseCost: 25,
            costMultiplier: 1.2,
            effect: 'clickAmount',
            effectAmount: 1,
            maxLevel: 30
        },
        
        // Instalación 3: Multiplicador global
        multiplier: {
            name: 'Sistema de Optimización',
            description: 'Multiplica toda la producción por un factor',
            icon: 'fa-rocket',
            color: 'danger',
            baseCost: 100,
            costMultiplier: 1.5,
            effect: 'globalMultiplier',
            effectAmount: 0.1,
            maxLevel: 20
        }
    },

    // ===== CONFIGURACIÓN DE INTERVALOS =====
    intervals: {
        saveInterval: 5000,        // Guardar cada 5 segundos
        updateInterval: 100,       // Actualizar UI cada 100ms
        gameInterval: 1000         // Actualizar recursos cada 1 segundo
    },

    // ===== CONFIGURACIÓN DE LOGROS =====
    achievements: [
        {
            id: 'first_click',
            name: 'Primer Clic',
            description: 'Haz tu primer clic',
            icon: 'fa-mouse-pointer',
            condition: (gameState) => gameState.stats.totalClicks >= 1
        },
        {
            id: 'mp_master',
            name: 'Maestro de Materia Prima',
            description: 'Acumula 1,000 MP',
            icon: 'fa-cogs',
            condition: (gameState) => gameState.baseResource.amount >= 1000
        },
        {
            id: 'first_upgrade',
            name: 'Primera Mejora',
            description: 'Mejora una instalación por primera vez',
            icon: 'fa-arrow-up',
            condition: (gameState) => Object.values(gameState.installations).some(inst => inst.level > 0)
        },
        {
            id: 'production_master',
            name: 'Maestro de Producción',
            description: 'Llega al nivel 10 en Fábrica de Producción',
            icon: 'fa-industry',
            condition: (gameState) => gameState.installations.production.level >= 10
        },
        {
            id: 'clicker_master',
            name: 'Maestro Clicker',
            description: 'Haz 1,000 clics',
            icon: 'fa-hand-point-up',
            condition: (gameState) => gameState.stats.totalClicks >= 1000
        },
        {
            id: 'multiplier_master',
            name: 'Optimizador',
            description: 'Llega al nivel 5 en Sistema de Optimización',
            icon: 'fa-rocket',
            condition: (gameState) => gameState.installations.multiplier.level >= 5
        }
    ],

    // ===== CONFIGURACIÓN DE UI =====
    ui: {
        title: 'Sistema de Nivelación de Recursos v2.0 - React',
        subtitle: 'Plantilla para Juegos Incrementales con Instalaciones',
        theme: 'dark',            // 'dark' o 'light'
        showNotifications: true,
        showParticles: false,     // Para futuras expansiones
        animationSpeed: 'normal'  // 'slow', 'normal', 'fast'
    },

    // ===== CONFIGURACIÓN DE GUARDADO =====
    save: {
        autoSave: true,
        saveKey: 'snr_react_game_save',
        backupSaves: 3,           // Número de saves de respaldo
        exportFormat: 'json'      // 'json' o 'csv'
    },

    // ===== CONFIGURACIÓN DE BALANCE =====
    balance: {
        // Multiplicadores de progresión
        rateMultiplier: 1.0,      // Multiplicador global de tasas
        costMultiplier: 1.0,      // Multiplicador global de costos
        
        // Configuración de escalado
        enableScaling: true,      // Habilitar escalado automático
        scalingFactor: 1.1,       // Factor de escalado por nivel
        
        // Límites del juego
        maxResources: 1e15,       // Límite máximo de recursos
        maxLevel: 10              // Nivel máximo alcanzable
    },

    // ===== CONFIGURACIÓN DE DEBUG =====
    debug: {
        enabled: false,           // Habilitar modo debug
        showFPS: false,           // Mostrar FPS
        logEvents: false,         // Registrar eventos en consola
        cheatMode: false          // Habilitar comandos de cheat
    }
};

// ===== TEMÁTICAS CON INSTALACIONES =====

// Tema: Ciencia
export const ScienceTheme = {
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
        cells: { name: 'Células', short: 'CL', icon: 'fa-microscope', color: 'success', baseRate: 0.01, clickAmount: 0.1, unlockCost: 100 },
        organisms: { name: 'Organismos', short: 'OG', icon: 'fa-leaf', color: 'warning', baseRate: 0.001, clickAmount: 0.01, unlockCost: 100 }
    },
    installations: {
        lab: { name: 'Laboratorio', description: 'Aumenta la producción de átomos', icon: 'fa-flask', color: 'primary', baseCost: 10, costMultiplier: 1.15, effect: 'baseRate', effectAmount: 0.5, maxLevel: 50 },
        microscope: { name: 'Microscopio', description: 'Aumenta átomos por clic', icon: 'fa-microscope', color: 'success', baseCost: 25, costMultiplier: 1.2, effect: 'clickAmount', effectAmount: 1, maxLevel: 30 },
        accelerator: { name: 'Acelerador', description: 'Multiplica toda la producción', icon: 'fa-rocket', color: 'danger', baseCost: 100, costMultiplier: 1.5, effect: 'globalMultiplier', effectAmount: 0.1, maxLevel: 20 }
    }
};

// Tema: Tecnología
export const TechTheme = {
    baseResource: {
        name: 'Bits',
        short: 'BT',
        icon: 'fa-microchip',
        color: 'primary',
        baseRate: 1.0,
        clickAmount: 5
    },
    resources: {
        bytes: { name: 'Bytes', short: 'BY', icon: 'fa-hdd', color: 'info', baseRate: 0.1, clickAmount: 1, unlockCost: 100 },
        kilobytes: { name: 'Kilobytes', short: 'KB', icon: 'fa-server', color: 'success', baseRate: 0.01, clickAmount: 0.1, unlockCost: 100 },
        megabytes: { name: 'Megabytes', short: 'MB', icon: 'fa-database', color: 'warning', baseRate: 0.001, clickAmount: 0.01, unlockCost: 100 }
    },
    installations: {
        processor: { name: 'Procesador', description: 'Aumenta la producción de bits', icon: 'fa-microchip', color: 'primary', baseCost: 10, costMultiplier: 1.15, effect: 'baseRate', effectAmount: 0.5, maxLevel: 50 },
        memory: { name: 'Memoria RAM', description: 'Aumenta bits por clic', icon: 'fa-memory', color: 'success', baseCost: 25, costMultiplier: 1.2, effect: 'clickAmount', effectAmount: 1, maxLevel: 30 },
        network: { name: 'Red', description: 'Multiplica toda la producción', icon: 'fa-network-wired', color: 'danger', baseCost: 100, costMultiplier: 1.5, effect: 'globalMultiplier', effectAmount: 0.1, maxLevel: 20 }
    }
};

// ===== FUNCIONES DE UTILIDAD =====

// Cambiar tema completo
export const changeTheme = (themeName) => {
    const theme = themeName === 'Science' ? ScienceTheme : 
                  themeName === 'Tech' ? TechTheme : null;
    
    if (theme) {
        Object.assign(SNRConfig, {
            baseResource: theme.baseResource,
            resources: theme.resources,
            installations: theme.installations
        });
        console.log(`Tema cambiado a: ${themeName}`);
        return true;
    }
    return false;
};

// Aplicar configuración personalizada
export const applyConfig = (customConfig) => {
    Object.assign(SNRConfig, customConfig);
    console.log('Configuración personalizada aplicada');
}; 