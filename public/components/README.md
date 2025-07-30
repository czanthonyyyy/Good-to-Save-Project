# Good to Save - Web Components

Este directorio contiene los web components reutilizables para el proyecto Good to Save.

## Componentes Disponibles

### 1. Header Component (`gts-header`)
Componente reutilizable que incluye la barra de navegación principal con el logo y menú.

### 2. Footer Component (`gts-footer`)
Componente reutilizable que incluye toda la información del pie de página, enlaces sociales, newsletter, y contacto.

## Cómo Usar

### Instalación
Incluye el archivo principal de componentes en tu página HTML:

```html
<script src="path/to/public/components/gts-components.js"></script>
```

### Uso del Header
```html
<gts-header current-page="home" base-url=""></gts-header>
```

#### Atributos del Header:
- `current-page`: Página actual para resaltar en el menú
  - Valores posibles: `"home"`, `"about"`, `"pricing"`, `"download"`, `"catalog"`
  - Valor por defecto: `""` (ninguna página resaltada)
- `base-url`: URL base para enlaces relativos
  - Para páginas en la raíz: `""`
  - Para páginas en subcarpetas: `"../"` o `"../../"` según la profundidad

### Uso del Footer
```html
<gts-footer base-url=""></gts-footer>
```

#### Atributos del Footer:
- `base-url`: URL base para enlaces relativos
  - Para páginas en la raíz: `""`
  - Para páginas en subcarpetas: `"../"` o `"../../"` según la profundidad

## Ejemplos de Implementación

### Página Principal (index.html)
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Otros meta tags y CSS -->
    <script src="public/components/gts-components.js"></script>
</head>
<body>
    <!-- Header -->
    <gts-header current-page="home" base-url=""></gts-header>
    
    <!-- Contenido de la página -->
    <main>
        <!-- Tu contenido aquí -->
    </main>
    
    <!-- Footer -->
    <gts-footer base-url=""></gts-footer>
</body>
</html>
```

### Página en Subcarpeta (public/pages/catalog.html)
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Otros meta tags y CSS -->
    <script src="../components/gts-components.js"></script>
</head>
<body>
    <!-- Header -->
    <gts-header current-page="catalog" base-url="../../"></gts-header>
    
    <!-- Contenido de la página -->
    <main>
        <!-- Tu contenido aquí -->
    </main>
    
    <!-- Footer -->
    <gts-footer base-url="../../"></gts-footer>
</body>
</html>
```

## Estructura de Archivos

```
public/components/
├── README.md                 # Este archivo
├── gts-components.js         # Archivo principal que carga todos los componentes
├── header-component.js       # Componente del header
└── footer-component.js       # Componente del footer
```

## Páginas Optimizadas

Las siguientes páginas ya han sido optimizadas para usar estos componentes:

1. ✅ `index.html` - Página principal
2. ✅ `public/pages/catalog.html` - Catálogo de productos
3. ✅ `Preguntas generale.html` - Preguntas frecuentes

## Beneficios

- **Reutilización**: No más código duplicado del header y footer
- **Mantenimiento**: Cambios en un solo lugar se reflejan en todas las páginas
- **Consistencia**: Garantiza que todas las páginas tengan la misma apariencia
- **Escalabilidad**: Fácil agregar nuevas páginas con la misma estructura
- **Flexibilidad**: Atributos personalizables para diferentes contextos

## Funciones Utilitarias

El archivo `gts-components.js` también incluye funciones utilitarias:

```javascript
// Detectar automáticamente la página actual
const currentPage = window.GTS.detectCurrentPage();

// Detectar automáticamente la URL base
const baseUrl = window.GTS.detectBaseUrl();

// Evento cuando los componentes están cargados
document.addEventListener('gts-components-loaded', function() {
    console.log('¡Componentes cargados!');
});
```

## Soporte

Para cualquier problema o sugerencia con los web components, contacta al equipo de desarrollo.