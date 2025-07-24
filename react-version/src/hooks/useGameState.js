import { useState, useEffect, useCallback, useRef } from 'react';
import { SNRConfig } from '../utils/config';

// Función para formatear números grandes
const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(1);
};

// Función para calcular el costo de una instalación
const calculateInstallationCost = (installationKey, level) => {
    const installation = SNRConfig.installations[installationKey];
    if (!installation) return 0;
    
    return Math.floor(installation.baseCost * Math.pow(installation.costMultiplier, level));
};

// Estado inicial del juego
const getInitialGameState = () => ({
    // Recurso base
    baseResource: {
        amount: 0,
        rate: SNRConfig.baseResource.baseRate,
        clickAmount: SNRConfig.baseResource.clickAmount
    },
    
    // Recursos jerárquicos
    resources: Object.keys(SNRConfig.resources).reduce((acc, key) => {
        acc[key] = {
            amount: 0,
            rate: 0,
            unlocked: false,
            ...SNRConfig.resources[key]
        };
        return acc;
    }, {}),
    
    // Instalaciones
    installations: Object.keys(SNRConfig.installations).reduce((acc, key) => {
        acc[key] = {
            level: 0,
            cost: SNRConfig.installations[key].baseCost,
            ...SNRConfig.installations[key]
        };
        return acc;
    }, {}),
    
    // Estadísticas
    stats: {
        totalClicks: 0,
        totalProduction: 0,
        gameStartTime: Date.now(),
        lastSaveTime: Date.now()
    },
    
    // Logros
    achievements: SNRConfig.achievements.map(achievement => ({
        ...achievement,
        unlocked: false,
        unlockedAt: null
    }))
});

// Hook principal del juego
export const useGameState = () => {
    const [gameState, setGameState] = useState(getInitialGameState);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const gameLoopRef = useRef(null);
    const saveIntervalRef = useRef(null);

    // Función para guardar el juego
    const saveGame = useCallback(() => {
        try {
            const saveData = {
                gameState,
                version: '2.0',
                saveTime: Date.now()
            };
            localStorage.setItem(SNRConfig.save.saveKey, JSON.stringify(saveData));
            console.log('Juego guardado exitosamente');
        } catch (error) {
            console.error('Error al guardar el juego:', error);
        }
    }, [gameState]);

    // Función para cargar el juego
    const loadGame = useCallback(() => {
        try {
            const savedData = localStorage.getItem(SNRConfig.save.saveKey);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (parsedData.version === '2.0') {
                    // Restaurar las funciones condition de los logros
                    const loadedGameState = parsedData.gameState;
                    if (loadedGameState.achievements) {
                        loadedGameState.achievements = loadedGameState.achievements.map((achievement, index) => ({
                            ...achievement,
                            condition: SNRConfig.achievements[index]?.condition || (() => false)
                        }));
                    }
                    setGameState(loadedGameState);
                    console.log('Juego cargado exitosamente');
                    return true;
                }
            }
        } catch (error) {
            console.error('Error al cargar el juego:', error);
        }
        return false;
    }, []);

    // Función para resetear el juego
    const resetGame = useCallback(() => {
        setGameState(getInitialGameState());
        localStorage.removeItem(SNRConfig.save.saveKey);
        console.log('Juego reseteado');
    }, []);

    // Función para recolectar recurso base manualmente
    const collectBaseResource = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            baseResource: {
                ...prev.baseResource,
                amount: prev.baseResource.amount + prev.baseResource.clickAmount
            },
            stats: {
                ...prev.stats,
                totalClicks: prev.stats.totalClicks + 1
            }
        }));
    }, []);

    // Función para desbloquear un recurso
    const unlockResource = useCallback((resourceKey) => {
        setGameState(prev => {
            const resource = prev.resources[resourceKey];
            
            if (!resource || resource.unlocked) {
                return prev;
            }
            
            if (prev.baseResource.amount >= resource.unlockCost) {
                return {
                    ...prev,
                    baseResource: {
                        ...prev.baseResource,
                        amount: prev.baseResource.amount - resource.unlockCost
                    },
                    resources: {
                        ...prev.resources,
                        [resourceKey]: {
                            ...resource,
                            unlocked: true
                        }
                    }
                };
            }
            return prev;
        });
    }, []);

    // Función para mejorar una instalación
    const upgradeInstallation = useCallback((installationKey) => {
        setGameState(prev => {
            const installation = prev.installations[installationKey];
            if (!installation || installation.level >= installation.maxLevel) return prev;
            
            if (prev.baseResource.amount >= installation.cost) {
                const newLevel = installation.level + 1;
                const newCost = calculateInstallationCost(installationKey, newLevel);
                
                return {
                    ...prev,
                    baseResource: {
                        ...prev.baseResource,
                        amount: prev.baseResource.amount - installation.cost
                    },
                    installations: {
                        ...prev.installations,
                        [installationKey]: {
                            ...installation,
                            level: newLevel,
                            cost: newCost
                        }
                    }
                };
            }
            return prev;
        });
    }, []);

    // Función para aplicar efectos de instalaciones
    const applyInstallationEffects = useCallback((state) => {
        let baseRate = SNRConfig.baseResource.baseRate;
        let clickAmount = SNRConfig.baseResource.clickAmount;
        let globalMultiplier = 1;

        // Aplicar efectos de instalaciones
        Object.entries(state.installations).forEach(([key, installation]) => {
            if (installation.level > 0) {
                switch (installation.effect) {
                    case 'baseRate':
                        baseRate += installation.effectAmount * installation.level;
                        break;
                    case 'clickAmount':
                        clickAmount += installation.effectAmount * installation.level;
                        break;
                    case 'globalMultiplier':
                        globalMultiplier += installation.effectAmount * installation.level;
                        break;
                }
            }
        });

        return {
            baseRate: baseRate * globalMultiplier,
            clickAmount,
            globalMultiplier
        };
    }, []);

    // Función para actualizar recursos
    const updateResources = useCallback(() => {
        setGameState(prev => {
            const effects = applyInstallationEffects(prev);
            
            // Actualizar recurso base
            const baseGeneration = effects.baseRate;
            const newBaseAmount = prev.baseResource.amount + baseGeneration;
            
            // Actualizar recursos jerárquicos
            const newResources = { ...prev.resources };
            Object.keys(newResources).forEach(key => {
                const resource = newResources[key];
                if (resource.unlocked) {
                    const resourceGeneration = resource.baseRate * effects.globalMultiplier;
                    newResources[key] = {
                        ...resource,
                        amount: resource.amount + resourceGeneration,
                        rate: resourceGeneration
                    };
                }
            });

            return {
                ...prev,
                baseResource: {
                    ...prev.baseResource,
                    amount: newBaseAmount,
                    rate: effects.baseRate,
                    clickAmount: effects.clickAmount
                },
                resources: newResources,
                stats: {
                    ...prev.stats,
                    totalProduction: prev.stats.totalProduction + baseGeneration
                }
            };
        });
    }, [applyInstallationEffects]);

    // Función para verificar logros
    const checkAchievements = useCallback(() => {
        setGameState(prev => {
            const newAchievements = prev.achievements.map(achievement => {
                if (!achievement.unlocked && achievement.condition(prev)) {
                    return {
                        ...achievement,
                        unlocked: true,
                        unlockedAt: Date.now()
                    };
                }
                return achievement;
            });

            return {
                ...prev,
                achievements: newAchievements
            };
        });
    }, []);

    // Iniciar el juego
    const startGame = useCallback(() => {
        if (isGameRunning) return;
        
        setIsGameRunning(true);
        
        // Cargar juego guardado
        loadGame();
        
        // Iniciar loop del juego
        gameLoopRef.current = setInterval(() => {
            updateResources();
            checkAchievements();
        }, SNRConfig.intervals.gameInterval);
        
        // Iniciar guardado automático
        if (SNRConfig.save.autoSave) {
            saveIntervalRef.current = setInterval(() => {
                saveGame();
            }, SNRConfig.intervals.saveInterval);
        }
        
        console.log('Juego iniciado');
    }, [isGameRunning, loadGame, updateResources, checkAchievements, saveGame]);

    // Detener el juego
    const stopGame = useCallback(() => {
        setIsGameRunning(false);
        
        if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
            gameLoopRef.current = null;
        }
        
        if (saveIntervalRef.current) {
            clearInterval(saveIntervalRef.current);
            saveIntervalRef.current = null;
        }
        
        console.log('Juego detenido');
    }, []);

    // Efecto para iniciar el juego automáticamente
    useEffect(() => {
        startGame();
        
        // Guardar al cerrar la ventana
        const handleBeforeUnload = () => {
            saveGame();
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            stopGame();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Función para formatear números
    const formatNumberForDisplay = useCallback((num) => {
        return formatNumber(num);
    }, []);

    return {
        gameState,
        isGameRunning,
        collectBaseResource,
        unlockResource,
        upgradeInstallation,
        saveGame,
        loadGame,
        resetGame,
        startGame,
        stopGame,
        formatNumber: formatNumberForDisplay
    };
}; 