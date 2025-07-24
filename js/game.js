/**
 * Sistema de Nivelación de Recursos (SNR) - Game Logic
 * Plantilla reutilizable para juegos incrementales
 * Versión 2.0 - 2025 (Con Sistema de Instalaciones)
 */

class SNRGame {
    constructor() {
        // Configuración del juego - FÁCILMENTE MODIFICABLE
        this.config = {
            // Recurso base (siempre disponible)
            baseResource: {
                name: 'Materia Prima',
                short: 'MP',
                icon: 'fa-cogs',
                color: 'warning',
                baseRate: 1.0,        // Generación base por segundo
                clickAmount: 5         // Cantidad por clic manual
            },
            
            // Recursos jerárquicos (desbloqueables)
            resources: {
                ce: { name: 'Componentes Ensamblados', short: 'CE', icon: 'fa-sliders-h', color: 'info',
                      baseRate: 0.1, clickAmount: 1, unlockCost: 100 },
                uc: { name: 'Unidades Complejas', short: 'UC', icon: 'fa-brain', color: 'success',
                      baseRate: 0.01, clickAmount: 0.1, unlockCost: 100 },
                ns: { name: 'Núcleos Sintéticos', short: 'NS', icon: 'fa-atom', color: 'danger',
                      baseRate: 0.001, clickAmount: 0.01, unlockCost: 100 }
            },

            // Sistema de instalaciones/edificios
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

            intervals: {
                saveInterval: 5000,
                updateInterval: 100,
                gameInterval: 1000
            }
        };

        // Estado del juego
        this.gameState = {
            // Recurso base
            baseResource: {
                amount: 0,
                rate: 1.0,           // Tasa actual (base + mejoras)
                clickAmount: 5        // Cantidad por clic actual
            },
            
            // Recursos jerárquicos
            resources: {
                ce: 0,
                uc: 0,
                ns: 0
            },
            
            // Estado de desbloqueo
            unlocked: {
                ce: false,
                uc: false,
                ns: false
            },
            
            // Sistema de instalaciones
            installations: {
                production: { level: 0, cost: 10 },
                clicker: { level: 0, cost: 25 },
                multiplier: { level: 0, cost: 100 }
            },
            
            // Estadísticas
            stats: {
                totalClicks: 0,
                playTime: 0,
                startTime: Date.now(),
                lastSave: Date.now(),
                totalProduction: 0
            },
            
            achievements: []
        };

        // Referencias a elementos DOM
        this.elements = {};
        
        // Intervals
        this.intervals = {};
        
        // Inicializar el juego
        this.init();
    }

    /**
     * Inicializar el juego
     */
    init() {
        console.log('🎮 Iniciando SNR Game v2.0...');
        this.loadGame();
        this.setupEventListeners();
        this.setupTooltips();
        this.updateInstallationCosts();
        this.updateUI();
        this.startGameLoop();
        this.loadAchievements();
        console.log('✅ SNR Game v2.0 inicializado con sistema de instalaciones');
        console.log('📊 Estado inicial:', {
            baseResource: this.gameState.baseResource,
            totalClicks: this.gameState.stats.totalClicks,
            startTime: new Date(this.gameState.stats.startTime).toLocaleTimeString()
        });
    }

    /**
     * Configurar tooltips personalizados
     */
    setupTooltips() {
        // Añadir clase tooltip-custom a elementos con data-tooltip
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.classList.add('tooltip-custom');
        });
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Botón de recolección del recurso base
        document.getElementById('mp-collect').addEventListener('click', () => this.collectBaseResource());

        // Botones de recolección de recursos jerárquicos
        document.getElementById('ce-collect').addEventListener('click', () => this.collectResource('ce'));
        document.getElementById('uc-collect').addEventListener('click', () => this.collectResource('uc'));
        document.getElementById('ns-collect').addEventListener('click', () => this.collectResource('ns'));

        // Botones de desbloqueo
        document.getElementById('unlock-ce').addEventListener('click', () => this.unlockResource('ce'));
        document.getElementById('unlock-uc').addEventListener('click', () => this.unlockResource('uc'));
        document.getElementById('unlock-ns').addEventListener('click', () => this.unlockResource('ns'));

        // Botones de instalaciones
        document.getElementById('upgrade-production').addEventListener('click', () => this.upgradeInstallation('production'));
        document.getElementById('upgrade-clicker').addEventListener('click', () => this.upgradeInstallation('clicker'));
        document.getElementById('upgrade-multiplier').addEventListener('click', () => this.upgradeInstallation('multiplier'));

        // Botones de control
        document.getElementById('saveBtn').addEventListener('click', () => this.saveGame());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());

        // Guardar automáticamente cuando se cierra la pestaña
        window.addEventListener('beforeunload', () => this.saveGame());

        // Atajos de teclado para accesibilidad
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    /**
     * Manejar atajos de teclado
     */
    handleKeyboardShortcuts(e) {
        // Espacio para recolectar MP
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            this.collectBaseResource();
        }
        
        // Ctrl+S para guardar
        if (e.ctrlKey && e.code === 'KeyS') {
            e.preventDefault();
            this.saveGame();
            this.showNotification('Juego guardado manualmente');
        }
        
        // Ctrl+R para reiniciar
        if (e.ctrlKey && e.code === 'KeyR') {
            e.preventDefault();
            this.resetGame();
        }
    }

    /**
     * Iniciar el bucle principal del juego
     */
    startGameLoop() {
        console.log('🚀 Iniciando bucle del juego...');
        
        // Actualizar recursos cada segundo
        this.intervals.game = setInterval(() => {
            this.updateResources();
        }, this.config.intervals.gameInterval);

        // Actualizar UI cada 100ms para animaciones suaves
        this.intervals.ui = setInterval(() => {
            this.updateUI();
        }, this.config.intervals.updateInterval);

        // Guardar automáticamente
        this.intervals.save = setInterval(() => {
            this.saveGame();
        }, this.config.intervals.saveInterval);
        
        console.log('✅ Bucle del juego iniciado correctamente');
    }

    /**
     * Actualizar recursos basado en tasas de generación
     */
    updateResources() {
        // Calcular multiplicador global
        const globalMultiplier = 1 + (this.gameState.installations.multiplier.level * this.config.installations.multiplier.effectAmount);
        
        // Actualizar recurso base - CORREGIDO: Ahora se genera correctamente
        const baseGeneration = this.gameState.baseResource.rate * globalMultiplier;
        this.gameState.baseResource.amount += baseGeneration;
        this.gameState.stats.totalProduction += baseGeneration;

        // DEBUG: Log cada segundo para verificar generación (solo los primeros 5 segundos)
        const currentTime = Math.floor((Date.now() - this.gameState.stats.startTime) / 1000);
        if (currentTime <= 5) {
            console.log(`⏰ Segundo ${currentTime}: +${baseGeneration.toFixed(3)} MP (Total: ${this.gameState.baseResource.amount.toFixed(3)} MP)`);
        }

        // Indicador visual de generación automática
        this.showAutoGenerationIndicator(baseGeneration);

        // Actualizar recursos jerárquicos
        Object.keys(this.config.resources).forEach(resourceKey => {
            if (this.gameState.unlocked[resourceKey]) {
                const resource = this.config.resources[resourceKey];
                this.gameState.resources[resourceKey] += resource.baseRate * globalMultiplier;
            }
        });
    }

    /**
     * Mostrar indicador visual de generación automática
     */
    showAutoGenerationIndicator(amount) {
        const indicator = document.getElementById('auto-generation-indicator');
        if (!indicator) {
            // Crear indicador si no existe
            const newIndicator = document.createElement('div');
            newIndicator.id = 'auto-generation-indicator';
            newIndicator.className = 'position-fixed top-0 end-0 m-3 p-2 bg-success text-white rounded';
            newIndicator.style.zIndex = '1050';
            newIndicator.style.fontSize = '0.8rem';
            newIndicator.innerHTML = `<i class="fas fa-sync-alt me-1"></i>Auto: +${amount.toFixed(3)} MP/seg`;
            document.body.appendChild(newIndicator);
        } else {
            // Actualizar indicador existente
            indicator.innerHTML = `<i class="fas fa-sync-alt me-1"></i>Auto: +${amount.toFixed(3)} MP/seg`;
        }
    }

    /**
     * Recolectar recurso base manualmente
     */
    collectBaseResource() {
        const clickAmount = this.gameState.baseResource.clickAmount;
        this.gameState.baseResource.amount += clickAmount;
        this.gameState.stats.totalClicks++;
        this.gameState.stats.totalProduction += clickAmount;

        // Efecto visual
        this.addClickEffect('mp');
        
        // Verificar logros
        this.checkAchievements();
    }

    /**
     * Recolectar recurso jerárquico manualmente
     */
    collectResource(resourceKey) {
        if (!this.gameState.unlocked[resourceKey]) return;

        const resource = this.config.resources[resourceKey];
        this.gameState.resources[resourceKey] += resource.clickAmount;
        this.gameState.stats.totalClicks++;

        // Efecto visual
        this.addClickEffect(resourceKey);
        
        // Verificar logros
        this.checkAchievements();
    }

    /**
     * Desbloquear nuevo recurso jerárquico
     */
    unlockResource(resourceKey) {
        const resource = this.config.resources[resourceKey];
        
        if (this.gameState.baseResource.amount < resource.unlockCost) {
            return;
        }

        // Gastar recursos
        this.gameState.baseResource.amount -= resource.unlockCost;
        
        // Desbloquear
        this.gameState.unlocked[resourceKey] = true;
        
        // Efecto visual
        this.unlockEffect(resourceKey);
        
        // Verificar logros
        this.checkAchievements();
    }

    /**
     * Mejorar instalación
     */
    upgradeInstallation(installationKey) {
        const installation = this.config.installations[installationKey];
        const currentLevel = this.gameState.installations[installationKey].level;
        const currentCost = this.gameState.installations[installationKey].cost;
        
        // Verificar si puede mejorar
        if (currentLevel >= installation.maxLevel || this.gameState.baseResource.amount < currentCost) {
            return;
        }

        // Gastar recursos
        this.gameState.baseResource.amount -= currentCost;
        
        // Mejorar instalación
        this.gameState.installations[installationKey].level++;
        
        // Calcular nuevo costo
        const newCost = Math.floor(installation.baseCost * Math.pow(installation.costMultiplier, this.gameState.installations[installationKey].level));
        this.gameState.installations[installationKey].cost = newCost;
        
        // Aplicar efecto de la mejora
        this.applyInstallationEffect(installationKey);
        
        // Efecto visual
        this.upgradeEffect(installationKey);
        
        // Verificar logros
        this.checkAchievements();
    }

    /**
     * Aplicar efecto de instalación
     */
    applyInstallationEffect(installationKey) {
        const installation = this.config.installations[installationKey];
        const level = this.gameState.installations[installationKey].level;
        
        switch (installation.effect) {
            case 'baseRate':
                this.gameState.baseResource.rate = this.config.baseResource.baseRate + (level * installation.effectAmount);
                break;
            case 'clickAmount':
                this.gameState.baseResource.clickAmount = this.config.baseResource.clickAmount + (level * installation.effectAmount);
                break;
            case 'globalMultiplier':
                // El multiplicador global se aplica en updateResources()
                break;
        }
    }

    /**
     * Obtener el recurso anterior en la jerarquía
     */
    getPreviousResource(resourceKey) {
        const resourceOrder = ['mp', 'ce', 'uc', 'ns'];
        const index = resourceOrder.indexOf(resourceKey);
        return index > 0 ? resourceOrder[index - 1] : null;
    }

    /**
     * Actualizar costos de instalaciones
     */
    updateInstallationCosts() {
        Object.keys(this.config.installations).forEach(installationKey => {
            const installation = this.config.installations[installationKey];
            const level = this.gameState.installations[installationKey].level;
            const cost = Math.floor(installation.baseCost * Math.pow(installation.costMultiplier, level));
            this.gameState.installations[installationKey].cost = cost;
        });
    }

    /**
     * Actualizar interfaz de usuario
     */
    updateUI() {
        // Actualizar contador del recurso base
        const baseCountElement = document.getElementById('mp-count');
        const baseRateElement = document.getElementById('mp-rate');
        
        if (baseCountElement) {
            const formattedAmount = this.formatNumber(this.gameState.baseResource.amount);
            if (baseCountElement.textContent !== formattedAmount) {
                baseCountElement.textContent = formattedAmount;
                baseCountElement.classList.add('updated');
                setTimeout(() => baseCountElement.classList.remove('updated'), 300);
            }
        }
        
        if (baseRateElement) {
            const formattedRate = this.gameState.baseResource.rate.toFixed(3);
            if (baseRateElement.textContent !== formattedRate) {
                baseRateElement.textContent = formattedRate;
            }
        }

        // Actualizar contadores de recursos jerárquicos
        Object.keys(this.config.resources).forEach(resourceKey => {
            const resource = this.config.resources[resourceKey];
            const countElement = document.getElementById(`${resourceKey}-count`);
            const rateElement = document.getElementById(`${resourceKey}-rate`);
            
            if (countElement) {
                const formattedCount = this.formatNumber(this.gameState.resources[resourceKey]);
                if (countElement.textContent !== formattedCount) {
                    countElement.textContent = formattedCount;
                }
            }
            
            if (rateElement) {
                const globalMultiplier = 1 + (this.gameState.installations.multiplier.level * this.config.installations.multiplier.effectAmount);
                const actualRate = this.gameState.unlocked[resourceKey] ? resource.baseRate * globalMultiplier : 0;
                const formattedRate = actualRate.toFixed(3);
                if (rateElement.textContent !== formattedRate) {
                    rateElement.textContent = formattedRate;
                }
            }
        });

        // Actualizar botones de desbloqueo
        this.updateUnlockButtons();

        // Actualizar paneles de recursos
        this.updateResourcePanels();

        // Actualizar instalaciones
        this.updateInstallations();

        // Actualizar estadísticas
        this.updateStats();

        // Actualizar logros
        this.updateAchievements();
    }

    /**
     * Actualizar botones de desbloqueo
     */
    updateUnlockButtons() {
        Object.keys(this.config.resources).forEach(resourceKey => {
            const resource = this.config.resources[resourceKey];
            const unlockButton = document.getElementById(`unlock-${resourceKey}`);
            const unlockPanel = document.getElementById(`${resourceKey}-unlock`);
            const resourcePanel = document.getElementById(`${resourceKey}-panel`);
            
            if (!unlockButton) return;

            const canUnlock = this.gameState.baseResource.amount >= resource.unlockCost;
            const isUnlocked = this.gameState.unlocked[resourceKey];

            if (isUnlocked) {
                // Recurso desbloqueado - ocultar botón de desbloqueo
                unlockPanel.style.display = 'none';
                resourcePanel.style.display = 'block';
                resourcePanel.classList.add('unlocked');
            } else {
                // Recurso bloqueado - mostrar botón de desbloqueo
                unlockPanel.style.display = 'block';
                resourcePanel.style.display = 'none';
                
                if (canUnlock) {
                    unlockButton.disabled = false;
                    unlockButton.classList.add('available');
                    unlockButton.innerHTML = `<i class="fas fa-arrow-alt-circle-right me-2" aria-hidden="true"></i>Desbloquear ${resource.short} (${resource.unlockCost} MP)`;
                } else {
                    unlockButton.disabled = true;
                    unlockButton.classList.remove('available');
                    unlockButton.innerHTML = `<i class="fas fa-lock me-2" aria-hidden="true"></i>Desbloquear ${resource.short} (${resource.unlockCost} MP)`;
                }
            }
        });
    }

    /**
     * Actualizar paneles de recursos
     */
    updateResourcePanels() {
        Object.keys(this.config.resources).forEach(resourceKey => {
            const resource = this.config.resources[resourceKey];
            const panel = document.getElementById(`${resourceKey}-panel`);
            const collectButton = document.getElementById(`${resourceKey}-collect`);
            
            if (panel && collectButton) {
                if (this.gameState.unlocked[resourceKey]) {
                    panel.style.display = 'block';
                    collectButton.disabled = false;
                } else {
                    panel.style.display = 'none';
                    collectButton.disabled = true;
                }
            }
        });
    }

    /**
     * Actualizar instalaciones
     */
    updateInstallations() {
        Object.keys(this.config.installations).forEach(installationKey => {
            const installation = this.config.installations[installationKey];
            const currentLevel = this.gameState.installations[installationKey].level;
            const currentCost = this.gameState.installations[installationKey].cost;
            
            // Actualizar elementos de la UI
            const levelElement = document.getElementById(`${installationKey}-level`);
            const costElement = document.getElementById(`${installationKey}-cost`);
            const upgradeButton = document.getElementById(`upgrade-${installationKey}`);
            
            if (levelElement) {
                levelElement.textContent = currentLevel;
            }
            
            if (costElement) {
                costElement.textContent = this.formatNumber(currentCost);
            }
            
            if (upgradeButton) {
                const canUpgrade = this.gameState.baseResource.amount >= currentCost && currentLevel < installation.maxLevel;
                upgradeButton.disabled = !canUpgrade;
                
                if (currentLevel >= installation.maxLevel) {
                    upgradeButton.innerHTML = `<i class="fas fa-check-circle me-2" aria-hidden="true"></i>Nivel Máximo`;
                    upgradeButton.classList.add('btn-success');
                    upgradeButton.classList.remove('btn-primary');
                } else if (canUpgrade) {
                    upgradeButton.innerHTML = `<i class="fas fa-arrow-up me-2" aria-hidden="true"></i>Mejorar (${this.formatNumber(currentCost)} MP)`;
                    upgradeButton.classList.add('btn-primary');
                    upgradeButton.classList.remove('btn-success');
                } else {
                    upgradeButton.innerHTML = `<i class="fas fa-lock me-2" aria-hidden="true"></i>Mejorar (${this.formatNumber(currentCost)} MP)`;
                    upgradeButton.classList.remove('btn-primary', 'btn-success');
                }
            }
        });
    }

    /**
     * Actualizar estadísticas
     */
    updateStats() {
        // Tiempo jugado
        const playTime = Math.floor((Date.now() - this.gameState.stats.startTime) / 1000);
        const hours = Math.floor(playTime / 3600);
        const minutes = Math.floor((playTime % 3600) / 60);
        const seconds = playTime % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const playTimeElement = document.getElementById('playTime');
        if (playTimeElement && playTimeElement.textContent !== timeString) {
            playTimeElement.textContent = timeString;
        }

        // Clics totales
        const totalClicksElement = document.getElementById('totalClicks');
        if (totalClicksElement && totalClicksElement.textContent !== this.gameState.stats.totalClicks.toString()) {
            totalClicksElement.textContent = this.gameState.stats.totalClicks;
        }

        // Nivel máximo
        const maxLevel = Object.values(this.gameState.unlocked).filter(unlocked => unlocked).length + 1;
        const maxLevelElement = document.getElementById('maxLevel');
        if (maxLevelElement && maxLevelElement.textContent !== maxLevel.toString()) {
            maxLevelElement.textContent = maxLevel;
        }

        // Generación total por segundo
        const globalMultiplier = 1 + (this.gameState.installations.multiplier.level * this.config.installations.multiplier.effectAmount);
        let totalGeneration = this.gameState.baseResource.rate * globalMultiplier;
        
        Object.keys(this.config.resources).forEach(resourceKey => {
            if (this.gameState.unlocked[resourceKey]) {
                totalGeneration += this.config.resources[resourceKey].baseRate * globalMultiplier;
            }
        });
        
        const totalGenerationElement = document.getElementById('totalGeneration');
        const formattedGeneration = totalGeneration.toFixed(3);
        if (totalGenerationElement && totalGenerationElement.textContent !== formattedGeneration) {
            totalGenerationElement.textContent = formattedGeneration;
        }
    }

    /**
     * Efecto visual al hacer clic
     */
    addClickEffect(resourceKey) {
        const button = document.getElementById(`${resourceKey}-collect`);
        const countElement = document.getElementById(`${resourceKey}-count`);
        
        if (button) {
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 200);
        }
        
        if (countElement) {
            countElement.classList.add('updated');
            setTimeout(() => countElement.classList.remove('updated'), 300);
        }
    }

    /**
     * Efecto visual al desbloquear
     */
    unlockEffect(resourceKey) {
        const panel = document.getElementById(`${resourceKey}-panel`);
        if (panel) {
            panel.style.display = 'block';
            panel.classList.add('unlocked');
            
            // Notificación
            this.showNotification(`¡${this.config.resources[resourceKey].name} desbloqueado!`);
        }
    }

    /**
     * Efecto visual al mejorar instalación
     */
    upgradeEffect(installationKey) {
        const installation = this.config.installations[installationKey];
        const levelElement = document.getElementById(`${installationKey}-level`);
        
        if (levelElement) {
            levelElement.classList.add('updated');
            setTimeout(() => levelElement.classList.remove('updated'), 300);
        }
        
        // Notificación
        this.showNotification(`¡${installation.name} mejorada al nivel ${this.gameState.installations[installationKey].level}!`);
    }

    /**
     * Mostrar notificación
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle me-2" aria-hidden="true"></i>${message}
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * Formatear números grandes
     */
    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toFixed(2);
    }

    /**
     * Guardar juego
     */
    saveGame() {
        try {
            const saveData = {
                gameState: this.gameState,
                timestamp: Date.now()
            };
            localStorage.setItem('snr_game_save', JSON.stringify(saveData));
            this.gameState.stats.lastSave = Date.now();
            console.log('💾 Juego guardado');
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    }

    /**
     * Cargar juego
     */
    loadGame() {
        try {
            const saveData = localStorage.getItem('snr_game_save');
            if (saveData) {
                const parsed = JSON.parse(saveData);
                this.gameState = parsed.gameState;
                
                // Aplicar efectos de instalaciones al cargar
                Object.keys(this.config.installations).forEach(installationKey => {
                    if (this.gameState.installations[installationKey].level > 0) {
                        this.applyInstallationEffect(installationKey);
                    }
                });
                
                console.log('📂 Juego cargado');
            }
        } catch (error) {
            console.error('Error al cargar:', error);
        }
    }

    /**
     * Reiniciar juego
     */
    resetGame() {
        if (confirm('¿Estás seguro de que quieres reiniciar el juego? Se perderá todo el progreso.')) {
            this.gameState = {
                baseResource: {
                    amount: 0,
                    rate: 1.0,
                    clickAmount: 5
                },
                resources: { ce: 0, uc: 0, ns: 0 },
                unlocked: { ce: false, uc: false, ns: false },
                installations: {
                    production: { level: 0, cost: 10 },
                    clicker: { level: 0, cost: 25 },
                    multiplier: { level: 0, cost: 100 }
                },
                stats: {
                    totalClicks: 0,
                    playTime: 0,
                    startTime: Date.now(),
                    lastSave: Date.now(),
                    totalProduction: 0
                },
                achievements: []
            };
            localStorage.removeItem('snr_game_save');
            this.updateUI();
            console.log('🔄 Juego reiniciado');
        }
    }

    /**
     * Cargar logros
     */
    loadAchievements() {
        this.achievements = [
            {
                id: 'first_click',
                name: 'Primer Clic',
                description: 'Haz tu primer clic',
                icon: 'fa-mouse-pointer',
                condition: () => this.gameState.stats.totalClicks >= 1,
                unlocked: false
            },
            {
                id: 'mp_master',
                name: 'Maestro de Materia Prima',
                description: 'Acumula 1,000 MP',
                icon: 'fa-cogs',
                condition: () => this.gameState.baseResource.amount >= 1000,
                unlocked: false
            },
            {
                id: 'first_upgrade',
                name: 'Primera Mejora',
                description: 'Mejora una instalación por primera vez',
                icon: 'fa-arrow-up',
                condition: () => Object.values(this.gameState.installations).some(inst => inst.level > 0),
                unlocked: false
            },
            {
                id: 'production_master',
                name: 'Maestro de Producción',
                description: 'Llega al nivel 10 en Fábrica de Producción',
                icon: 'fa-industry',
                condition: () => this.gameState.installations.production.level >= 10,
                unlocked: false
            },
            {
                id: 'clicker_master',
                name: 'Maestro Clicker',
                description: 'Haz 1,000 clics',
                icon: 'fa-hand-point-up',
                condition: () => this.gameState.stats.totalClicks >= 1000,
                unlocked: false
            },
            {
                id: 'multiplier_master',
                name: 'Optimizador',
                description: 'Llega al nivel 5 en Sistema de Optimización',
                icon: 'fa-rocket',
                condition: () => this.gameState.installations.multiplier.level >= 5,
                unlocked: false
            }
        ];
    }

    /**
     * Verificar logros
     */
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked && achievement.condition()) {
                achievement.unlocked = true;
                this.gameState.achievements.push(achievement.id);
                this.showNotification(`🏆 Logro desbloqueado: ${achievement.name}`);
            }
        });
    }

    /**
     * Actualizar logros en UI
     */
    updateAchievements() {
        const container = document.getElementById('achievements');
        if (!container) return;

        container.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `col-md-6 col-lg-4 mb-3`;
            achievementElement.innerHTML = `
                <div class="achievement card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                    <div class="card-body text-center">
                        <i class="fas ${achievement.icon} fa-2x mb-2 ${achievement.unlocked ? 'text-success' : 'text-muted'}" aria-hidden="true"></i>
                        <h6 class="card-title">${achievement.name}</h6>
                        <p class="card-text small text-muted">${achievement.description}</p>
                    </div>
                </div>
            `;
            container.appendChild(achievementElement);
        });
    }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.snrGame = new SNRGame();
});

// Exportar para uso en consola de desarrollador
window.SNRGame = SNRGame; 