# Portfolio — Impact Transitions

Portfolio con animaciones de impacto inspiradas en Persona 5, construido con React + Framer Motion.

## Stack

- **React 18** + **Vite**
- **Framer Motion** para todas las animaciones
- **Space Grotesk** (body) + **Syne** (display) — Google Fonts

## Instalación

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Animaciones incluidas

| Animación | Dónde |
|-----------|-------|
| Word burst — palabras que irrumpen en pantalla | Hero |
| Page wipe — cortina de dos capas al navegar | Global (nav links) |
| Slide-in lateral desde fuera del frame | Stats de About |
| Fill wipe horizontal en hover | Filas de proyectos |
| Skewed slash-wipe en hover | Links de contacto |
| Stagger reveal con skewY | Skills grid |
| Cursor magnético con mix-blend-mode | Global |

## Personalización rápida

Edita los datos en cada sección:
- `src/sections/Hero.jsx` — título y subtítulo
- `src/sections/About.jsx` — stats personales
- `src/sections/Work.jsx` — array `projects`
- `src/sections/Skills.jsx` — array `skills`
- `src/sections/Contact.jsx` — array `contactLinks`
- `src/App.jsx` — iniciales del logo (busca "YK")

### Colores

En `src/index.css` ajusta las variables CSS:

```css
:root {
  --ink: #0E0E0E;       /* fondo oscuro y textos sobre claro */
  --paper: #F5F2ED;     /* fondo principal */
  --accent: #C8FF00;    /* verde lima — el color de impacto */
  --muted: #8A8A8A;     /* textos secundarios */
  --surface: #EEEBE4;   /* fondo de secciones alternativas */
}
```
