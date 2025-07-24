#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createProject() {
  const projectName = process.argv[2];
  
  if (!projectName) {
    log('❌ Error: Debes especificar un nombre para el proyecto', 'red');
    log('Uso: node create-project.js <nombre-del-proyecto>', 'yellow');
    process.exit(1);
  }

  const templateDir = __dirname;
  const projectDir = path.join(process.cwd(), projectName);

  log(`🚀 Creando proyecto: ${projectName}`, 'green');

  try {
    // Crear directorio del proyecto
    if (fs.existsSync(projectDir)) {
      log(`❌ Error: El directorio ${projectName} ya existe`, 'red');
      process.exit(1);
    }

    fs.mkdirSync(projectDir, { recursive: true });

    // Función para copiar archivos recursivamente
    function copyDirectory(src, dest) {
      const entries = fs.readdirSync(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyDirectory(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }

    // Copiar archivos de la plantilla
    copyDirectory(templateDir, projectDir);

    // Archivos a excluir
    const excludeFiles = [
      '.git',
      'node_modules',
      'dist',
      'create-project.js',
      'package-lock.json',
      'yarn.lock'
    ];

    // Eliminar archivos excluidos
    excludeFiles.forEach(file => {
      const filePath = path.join(projectDir, file);
      if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
    });

    // Actualizar package.json
    const packagePath = path.join(projectDir, 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      packageJson.name = projectName;
      packageJson.description = `Juego incremental basado en la plantilla SNR - ${projectName}`;
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    }

    // Actualizar README.md
    const readmePath = path.join(projectDir, 'README.md');
    if (fs.existsSync(readmePath)) {
      let readmeContent = fs.readFileSync(readmePath, 'utf8');
      readmeContent = readmeContent.replace(/plantilla-generador/g, projectName);
      readmeContent = readmeContent.replace(/SNR - Sistema de Nivelación de Recursos/g, `${projectName} - Sistema de Nivelación de Recursos`);
      fs.writeFileSync(readmePath, readmeContent);
    }

    // Inicializar Git
    execSync('git init', { cwd: projectDir, stdio: 'inherit' });
    execSync('git add .', { cwd: projectDir, stdio: 'inherit' });
    execSync('git commit -m "Initial commit from template"', { cwd: projectDir, stdio: 'inherit' });

    log(`✅ Proyecto ${projectName} creado exitosamente!`, 'green');
    log(`📁 Ubicación: ${projectDir}`, 'cyan');
    log(`🚀 Para comenzar:`, 'yellow');
    log(`   cd ${projectName}`, 'blue');
    log(`   npm install`, 'blue');
    log(`   npm run dev`, 'blue`);

  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

createProject(); 