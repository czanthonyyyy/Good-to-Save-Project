/**
 * Good to Save - Web Components
 * Archivo principal que carga todos los web components del proyecto
 * 
 * Uso:
 * 1. Incluir este archivo en tu HTML: <script src="path/to/gts-components.js"></script>
 * 2. Usar los componentes en tu HTML:
 *    - Header: <gts-header current-page="home" base-url=""></gts-header>
 *    - Footer: <gts-footer base-url=""></gts-footer>
 * 
 * Atributos:
 * - current-page: página actual para resaltar en el menú (home, about, pricing, download, catalog)
 * - base-url: URL base para enlaces relativos (ej: "../" para páginas en subcarpetas)
 */

// Verificar si los custom elements ya están definidos para evitar errores
function loadComponent(scriptPath, componentName, checkElement) {
    return new Promise((resolve, reject) => {
        // Si el componente ya está definido, resolver inmediatamente
        if (customElements.get(checkElement)) {
            resolve();
            return;
        }

        // Crear script tag para cargar el componente
        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = () => {
            // Esperar a que el custom element esté definido
            customElements.whenDefined(checkElement).then(resolve);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Detectar la ruta base del archivo actual
function getBasePath() {
    const currentScript = document.currentScript;
    if (currentScript) {
        const scriptPath = currentScript.src;
        return scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
    }
    return './public/components/';
}

// Cargar componentes de forma asíncrona
async function loadGTSComponents() {
    const basePath = getBasePath();
    
    try {
        // Cargar header y footer en paralelo
        await Promise.all([
            loadComponent(`${basePath}header-component.js`, 'HeaderComponent', 'gts-header'),
            loadComponent(`${basePath}footer-component.js`, 'FooterComponent', 'gts-footer')
        ]);
        
        console.log('Good to Save components loaded successfully!');
        
        // Emitir evento personalizado cuando todos los componentes estén cargados
        document.dispatchEvent(new CustomEvent('gts-components-loaded'));
        
    } catch (error) {
        console.error('Error loading Good to Save components:', error);
    }
}

// Cargar componentes cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGTSComponents);
} else {
    loadGTSComponents();
}

// Función utilitaria para detectar automáticamente la página actual
function detectCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    if (path.includes('catalog')) return 'catalog';
    if (hash.includes('#about') || path.includes('about')) return 'about';
    if (hash.includes('#pricing') || path.includes('pricing')) return 'pricing';
    if (hash.includes('#download') || path.includes('download')) return 'download';
    if (path.includes('index') || path === '/' || path.endsWith('/')) return 'home';
    
    return '';
}

// Función utilitaria para detectar la URL base relativa
function detectBaseUrl() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    
    if (path.includes('/pages/') || path.includes('/public/')) {
        return '../../';
    } else if (depth > 1) {
        return '../'.repeat(depth - 1);
    }
    
    return '';
}

// Hacer funciones disponibles globalmente
window.GTS = {
    detectCurrentPage,
    detectBaseUrl,
    loadGTSComponents
};