import React from 'react';
import { useGameState } from './hooks/useGameState';
import { SNRConfig } from './utils/config';
import './App.css';

// Componente para el recurso base
const BaseResource = ({ gameState, onCollect, formatNumber }) => {
  const { baseResource } = gameState;
  
  return (
    <div className="col-12 mb-4">
      <div className="card bg-dark border-primary resource-panel">
        <div className="card-header bg-primary bg-opacity-25 border-primary">
          <h4 className="mb-0">
            <i className={`fas ${SNRConfig.baseResource.icon} me-2`} aria-hidden="true"></i>
            {SNRConfig.baseResource.name}
          </h4>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <span className="resource-count fs-1 me-3">
                  {formatNumber(baseResource.amount)}
                </span>
                <div>
                  <div className="text-muted">
                    <i className="fas fa-tachometer-alt me-1" aria-hidden="true"></i>
                    {formatNumber(baseResource.rate)}/s
                  </div>
                  <div className="text-muted small">
                    <i className="fas fa-mouse-pointer me-1" aria-hidden="true"></i>
                    +{formatNumber(baseResource.clickAmount)} por clic
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button
                className="btn btn-warning btn-lg btn-collect"
                onClick={onCollect}
                data-tooltip="Haz clic para recolectar Materia Prima manualmente"
              >
                <i className="fas fa-hand-point-up me-2" aria-hidden="true"></i>
                Recolectar {SNRConfig.baseResource.short}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para recursos jerárquicos
const HierarchicalResource = ({ resourceKey, resource, onUnlock, formatNumber }) => {
  const config = SNRConfig.resources[resourceKey];
  
  return (
    <div className={`col-md-6 mb-3 ${!resource.unlocked ? 'locked-panel' : ''}`}>
      <div className="card bg-dark border-primary resource-panel h-100">
        <div className={`card-header bg-${config.color} bg-opacity-25 border-${config.color}`}>
          <h6 className="mb-0">
            <i className={`fas ${config.icon} me-2`} aria-hidden="true"></i>
            {config.name}
          </h6>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            <div className="resource-count fs-4 mb-2">
              {formatNumber(resource.amount)}
            </div>
            <div className="text-muted">
              <i className="fas fa-tachometer-alt me-1" aria-hidden="true"></i>
              {formatNumber(resource.rate)}/s
            </div>
          </div>
          
          {!resource.unlocked ? (
            <button
              className={`btn btn-${config.color} btn-unlock mt-auto ${
                resource.amount >= config.unlockCost ? 'available' : ''
              }`}
              onClick={() => onUnlock(resourceKey)}
              disabled={resource.amount < config.unlockCost}
              data-tooltip={`Desbloquear ${config.name} por ${formatNumber(config.unlockCost)} MP`}
            >
              <i className="fas fa-lock me-2" aria-hidden="true"></i>
              Desbloquear ({formatNumber(config.unlockCost)} MP)
            </button>
          ) : (
            <div className="mt-auto">
              <div className="text-success">
                <i className="fas fa-check-circle me-1" aria-hidden="true"></i>
                Desbloqueado
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente para instalaciones
const Installation = ({ installationKey, installation, onUpgrade, formatNumber }) => {
  const config = SNRConfig.installations[installationKey];
  
  return (
    <div className="col-md-4 mb-3">
      <div className="card bg-dark border-primary h-100">
        <div className={`card-header bg-${config.color} bg-opacity-25 border-${config.color}`}>
          <h6 className="mb-0">
            <i className={`fas ${config.icon} me-2`} aria-hidden="true"></i>
            {config.name}
          </h6>
        </div>
        <div className="card-body d-flex flex-column">
          <p className="card-text small mb-3">{config.description}</p>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted">Nivel:</span>
              <span className="fw-bold">{installation.level}/{installation.maxLevel}</span>
            </div>
            <div className="progress">
              <div 
                className={`progress-bar bg-${config.color}`}
                style={{ width: `${(installation.level / installation.maxLevel) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Costo:</span>
              <span className="fw-bold">{formatNumber(installation.cost)} MP</span>
            </div>
          </div>
          
          <button
            className={`btn btn-${config.color} btn-sm mt-auto`}
            onClick={() => onUpgrade(installationKey)}
            disabled={installation.level >= installation.maxLevel}
            data-tooltip={`Mejorar ${config.name} al nivel ${installation.level + 1}`}
          >
            <i className="fas fa-arrow-up me-1" aria-hidden="true"></i>
            Mejorar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para estadísticas
const Stats = ({ gameState, formatNumber }) => {
  const { stats } = gameState;
  const gameTime = Math.floor((Date.now() - stats.gameStartTime) / 1000);
  
  return (
    <div className="col-md-6 mb-4">
      <div className="card bg-dark border-info">
        <div className="card-header bg-info bg-opacity-25 border-info">
          <h6 className="mb-0">
            <i className="fas fa-chart-line me-2" aria-hidden="true"></i>
            Estadísticas
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="text-center mb-3">
                <div className="fs-4 fw-bold text-primary">{stats.totalClicks}</div>
                <div className="text-muted small">Clics Totales</div>
              </div>
            </div>
            <div className="col-6">
              <div className="text-center mb-3">
                <div className="fs-4 fw-bold text-success">{formatNumber(stats.totalProduction)}</div>
                <div className="text-muted small">Producción Total</div>
              </div>
            </div>
            <div className="col-6">
              <div className="text-center mb-3">
                <div className="fs-4 fw-bold text-warning">{Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</div>
                <div className="text-muted small">Tiempo de Juego</div>
              </div>
            </div>
            <div className="col-6">
              <div className="text-center mb-3">
                <div className="fs-4 fw-bold text-info">{formatNumber(stats.totalProduction / Math.max(gameTime, 1))}</div>
                <div className="text-muted small">MP/s Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para logros
const Achievements = ({ gameState }) => {
  const { achievements } = gameState;
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  
  return (
    <div className="col-md-6 mb-4">
      <div className="card bg-dark border-warning">
        <div className="card-header bg-warning bg-opacity-25 border-warning">
          <h6 className="mb-0">
            <i className="fas fa-trophy me-2" aria-hidden="true"></i>
            Logros ({unlockedCount}/{achievements.length})
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="col-6 mb-2">
                <div className={`achievement p-2 rounded ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="d-flex align-items-center">
                    <i className={`fas ${achievement.icon} me-2 ${achievement.unlocked ? 'text-success' : 'text-muted'}`} aria-hidden="true"></i>
                    <div className="small">
                      <div className="fw-bold">{achievement.name}</div>
                      <div className="text-muted">{achievement.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
function App() {
  const {
    gameState,
    collectBaseResource,
    unlockResource,
    upgradeInstallation,
    saveGame,
    resetGame,
    formatNumber
  } = useGameState();

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
        <div className="container-fluid">
          <h1 className="navbar-brand mb-0 h1">
            <i className="fas fa-cogs me-2" aria-hidden="true"></i>
            {SNRConfig.ui.title}
          </h1>
          <div className="navbar-nav ms-auto">
            <button
              className="btn btn-outline-light btn-sm me-2"
              onClick={saveGame}
              data-tooltip="Guardar juego manualmente"
            >
              <i className="fas fa-save me-1" aria-hidden="true"></i>
              Guardar
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={resetGame}
              data-tooltip="Resetear juego (¡Cuidado!)"
            >
              <i className="fas fa-trash me-1" aria-hidden="true"></i>
              Resetear
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container-fluid py-4">
        <div className="row">
          {/* Recurso base */}
          <BaseResource
            gameState={gameState}
            onCollect={collectBaseResource}
            formatNumber={formatNumber}
          />
        </div>

        <div className="row">
          {/* Recursos jerárquicos */}
          {Object.entries(gameState.resources).map(([key, resource]) => (
            <HierarchicalResource
              key={key}
              resourceKey={key}
              resource={resource}
              onUnlock={unlockResource}
              formatNumber={formatNumber}
            />
          ))}
        </div>

        {/* Instalaciones */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card bg-dark border-primary">
              <div className="card-header bg-primary bg-opacity-25 border-primary">
                <h5 className="mb-0">
                  <i className="fas fa-industry me-2" aria-hidden="true"></i>
                  Instalaciones y Mejoras
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {Object.entries(gameState.installations).map(([key, installation]) => (
                    <Installation
                      key={key}
                      installationKey={key}
                      installation={installation}
                      onUpgrade={upgradeInstallation}
                      formatNumber={formatNumber}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Estadísticas y logros */}
          <Stats gameState={gameState} formatNumber={formatNumber} />
          <Achievements gameState={gameState} />
        </div>
      </main>

      {/* Footer */}
      <footer className="navbar navbar-expand-lg navbar-dark bg-dark border-top mt-5">
        <div className="container-fluid">
          <span className="navbar-text">
            <i className="fas fa-code me-1" aria-hidden="true"></i>
            {SNRConfig.ui.subtitle}
          </span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text">
              <i className="fas fa-clock me-1" aria-hidden="true"></i>
              v{SNRConfig.ui.version || '2.0.0'} - React
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 