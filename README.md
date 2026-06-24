# ComuniK2 — Ecommerce Landing Page

## Estructura del proyecto

```
comunik2/
├── index.html          ← Página principal (hero + productos + categorías)
├── producto.html       ← Página de producto individual (estilo Satori369)
├── terminos.html       ← Términos del servicio
├── reclamaciones.html  ← Libro de reclamaciones (Ley N° 29571)
├── css/
│   ├── style.css       ← Estilos globales (header, footer, hero, grids)
│   ├── producto.css    ← Estilos de página de producto
│   └── reclamaciones.css ← Estilos del libro de reclamaciones
├── js/
│   ├── main.js         ← Slider, accordion, placeholders
│   ├── producto.js     ← Galería de producto, cantidad
│   └── reclamaciones.js ← Formulario de reclamaciones
├── images/
│   ├── banners/        ← banner1.jpg, banner2.jpg (hero slider)
│   ├── categorias/     ← soportes.jpg, cargadores.jpg, mousepads.jpg, accesorios.jpg
│   └── productos/
│       ├── prod1-a.jpg / prod1-b.jpg  ← imagen principal / hover
│       ├── prod2-a.jpg / prod2-b.jpg
│       ├── prod3-a.jpg / prod3-b.jpg
│       ├── prod4-a.jpg / prod4-b.jpg
│       ├── content1-6.jpg  ← galería scroll en página de producto
│       ├── feat1-3.jpg     ← features oscuras
│       ├── antes.jpg / despues.jpg ← comparativa narrativa
│       └── (más según necesites)
└── video/
    └── producto.mp4    ← Video del producto (opcional)
```

## Convención de imágenes de producto

Cada producto tiene DOS imágenes:
- `prodX-a.jpg` → imagen que se ve por defecto
- `prodX-b.jpg` → imagen que aparece al pasar el mouse (hover)

El efecto de cambio al hover es automático con CSS puro.

## Paleta de colores

| Color      | Hex       | Uso |
|------------|-----------|-----|
| Rojo       | `#CC0000` | Precios, badges, CTAs, acentos |
| Negro/Dark | `#1A1A1A` | Header, stats, features dark |
| Gris oscuro| `#2C2C2C` | Texto secundario |
| Gris claro | `#F4F4F4` | Fondos de sección |
| Blanco     | `#FFFFFF` | Fondo principal |

## Tipografía

Outfit (Google Fonts) — weights: 400, 500, 600, 700, 800, 900

## Para desplegar en Vercel

1. Subir esta carpeta a un repositorio GitHub
2. Conectar el repo en vercel.com
3. No requiere build (HTML puro) — Vercel lo detecta automáticamente
4. El output directory se deja vacío (raíz del proyecto)
```
