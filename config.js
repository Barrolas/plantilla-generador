/**
 * Configuración del Sistema de Nivelación de Recursos (SNR) v2.0
 * 
 * Este archivo contiene todas las configuraciones que puedes modificar
 * para personalizar el juego según tus necesidades.
 * 
 * Para usar esta configuración, incluye este archivo en index.html
 * antes de game.js y modifica la clase SNRGame para usar window.SNRConfig
 */

window.SNRConfig = {
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
        
        // ===== AÑADIR MÁS RECURSOS AQUÍ =====
        // nivel5: {
        //     name: 'Tu Nuevo Recurso',
        //     short: 'TNR',
        //     icon: 'fa-tu-icono',
        //     color: 'primary',
        //     baseRate: 0.0001,
        //     clickAmount: 0.001,
        //     unlockCost: 100      // Requiere 100 MP
        // }
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
        
        // ===== AÑADIR MÁS INSTALACIONES AQUÍ =====
        // nuevaInstalacion: {
        //     name: 'Tu Nueva Instalación',
        //     description: 'Descripción de la instalación',
        //     icon: 'fa-tu-icono',
        //     color: 'warning',
        //     baseCost: 50,
        //     costMultiplier: 1.25,
        //     effect: 'tuEfecto',
        //     effectAmount: 0.2,
        //     maxLevel: 25
        // }
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
        
        // ===== AÑADIR MÁS LOGROS AQUÍ =====
        // {
        //     id: 'tu_logro',
        //     name: 'Nombre del Logro',
        //     description: 'Descripción del logro',
        //     icon: 'fa-tu-icono',
        //     condition: (gameState) => tuCondicion(gameState)
        // }
    ],

    // ===== CONFIGURACIÓN DE UI =====
    ui: {
        title: 'Sistema de Nivelación de Recursos v2.0',
        subtitle: 'Plantilla para Juegos Incrementales con Instalaciones',
        theme: 'dark',            // 'dark' o 'light'
        showNotifications: true,
        showParticles: false,     // Para futuras expansiones
        animationSpeed: 'normal'  // 'slow', 'normal', 'fast'
    },

    // ===== CONFIGURACIÓN DE GUARDADO =====
    save: {
        autoSave: true,
        saveKey: 'snr_game_save',
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

// ===== EJEMPLOS DE TEMÁTICAS CON INSTALACIONES =====

// Tema: Ciencia
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
window.TechTheme = {
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

// Tema: Naturaleza
window.NatureTheme = {
    baseResource: {
        name: 'Semillas',
        short: 'SD',
        icon: 'fa-seedling',
        color: 'success',
        baseRate: 1.0,
        clickAmount: 5
    },
    resources: {
        plants: { name: 'Plantas', short: 'PL', icon: 'fa-leaf', color: 'info', baseRate: 0.1, clickAmount: 1, unlockCost: 100 },
        trees: { name: 'Árboles', short: 'TR', icon: 'fa-tree', color: 'warning', baseRate: 0.01, clickAmount: 0.1, unlockCost: 100 },
        forests: { name: 'Bosques', short: 'BF', icon: 'fa-mountain', color: 'danger', baseRate: 0.001, clickAmount: 0.01, unlockCost: 100 }
    },
    installations: {
        greenhouse: { name: 'Invernadero', description: 'Aumenta la producción de semillas', icon: 'fa-seedling', color: 'primary', baseCost: 10, costMultiplier: 1.15, effect: 'baseRate', effectAmount: 0.5, maxLevel: 50 },
        irrigation: { name: 'Sistema de Riego', description: 'Aumenta semillas por clic', icon: 'fa-tint', color: 'success', baseCost: 25, costMultiplier: 1.2, effect: 'clickAmount', effectAmount: 1, maxLevel: 30 },
        ecosystem: { name: 'Ecosistema', description: 'Multiplica toda la producción', icon: 'fa-globe', color: 'danger', baseCost: 100, costMultiplier: 1.5, effect: 'globalMultiplier', effectAmount: 0.1, maxLevel: 20 }
    }
};

// Tema: Espacio
window.SpaceTheme = {
    baseResource: {
        name: 'Polvo Cósmico',
        short: 'PC',
        icon: 'fa-star',
        color: 'warning',
        baseRate: 1.0,
        clickAmount: 5
    },
    resources: {
        planets: { name: 'Planetas', short: 'PL', icon: 'fa-globe', color: 'info', baseRate: 0.1, clickAmount: 1, unlockCost: 100 },
        stars: { name: 'Estrellas', short: 'ES', icon: 'fa-sun', color: 'danger', baseRate: 0.01, clickAmount: 0.1, unlockCost: 100 },
        galaxies: { name: 'Galaxias', short: 'GL', icon: 'fa-galaxy', color: 'primary', baseRate: 0.001, clickAmount: 0.01, unlockCost: 100 }
    },
    installations: {
        telescope: { name: 'Telescopio', description: 'Aumenta la producción de polvo cósmico', icon: 'fa-telescope', color: 'primary', baseCost: 10, costMultiplier: 1.15, effect: 'baseRate', effectAmount: 0.5, maxLevel: 50 },
        satellite: { name: 'Satélite', description: 'Aumenta polvo por clic', icon: 'fa-satellite', color: 'success', baseCost: 25, costMultiplier: 1.2, effect: 'clickAmount', effectAmount: 1, maxLevel: 30 },
        wormhole: { name: 'Agujero de Gusano', description: 'Multiplica toda la producción', icon: 'fa-portal', color: 'danger', baseCost: 100, costMultiplier: 1.5, effect: 'globalMultiplier', effectAmount: 0.1, maxLevel: 20 }
    }
};

// Tema: Cocina
window.CookingTheme = {
    baseResource: {
        name: 'Ingredientes',
        short: 'IG',
        icon: 'fa-carrot',
        color: 'warning',
        baseRate: 1.0,
        clickAmount: 5
    },
    resources: {
        dishes: { name: 'Platos', short: 'PL', icon: 'fa-utensils', color: 'info', baseRate: 0.1, clickAmount: 1, unlockCost: 100 },
        menus: { name: 'Menús', short: 'MN', icon: 'fa-clipboard-list', color: 'success', baseRate: 0.01, clickAmount: 0.1, unlockCost: 100 },
        restaurants: { name: 'Restaurantes', short: 'RS', icon: 'fa-store', color: 'danger', baseRate: 0.001, clickAmount: 0.01, unlockCost: 100 }
    },
    installations: {
        kitchen: { name: 'Cocina', description: 'Aumenta la producción de ingredientes', icon: 'fa-utensils', color: 'primary', baseCost: 10, costMultiplier: 1.15, effect: 'baseRate', effectAmount: 0.5, maxLevel: 50 },
        chef: { name: 'Chef', description: 'Aumenta ingredientes por clic', icon: 'fa-user-chef', color: 'success', baseCost: 25, costMultiplier: 1.2, effect: 'clickAmount', effectAmount: 1, maxLevel: 30 },
        franchise: { name: 'Franquicia', description: 'Multiplica toda la producción', icon: 'fa-store', color: 'danger', baseCost: 100, costMultiplier: 1.5, effect: 'globalMultiplier', effectAmount: 0.1, maxLevel: 20 }
    }
};

// ===== FUNCIONES DE UTILIDAD =====

// Cambiar tema completo
window.changeTheme = function(themeName) {
    const theme = window[themeName + 'Theme'];
    if (theme) {
        window.SNRConfig.baseResource = theme.baseResource;
        window.SNRConfig.resources = theme.resources;
        window.SNRConfig.installations = theme.installations;
        console.log(`Tema cambiado a: ${themeName}`);
    }
};

// Aplicar configuración personalizada
window.applyConfig = function(customConfig) {
    Object.assign(window.SNRConfig, customConfig);
    console.log('Configuración personalizada aplicada');
};

// Ejemplo de uso:
// changeTheme('Science');  // Cambiar a tema de ciencia
// changeTheme('Tech');     // Cambiar a tema de tecnología
// changeTheme('Nature');   // Cambiar a tema de naturaleza
// changeTheme('Space');    // Cambiar a tema de espacio
// changeTheme('Cooking');  // Cambiar a tema de cocina 