# PROMPT PARA CLAUDE CODE — DEPLOY COMUNIK2 EN VERCEL

Copia y pega este prompt completo en Claude Code:

---

Tengo un proyecto de landing page ecommerce HTML puro (sin framework) llamado ComuniK2 ubicado en la carpeta `./comunik2/`. Necesito que hagas lo siguiente paso a paso:

## 1. Revisar la estructura
Primero lista todos los archivos del proyecto con `ls -R ./comunik2/` para confirmar que están todos los archivos necesarios.

## 2. Inicializar repositorio Git
```bash
cd comunik2
git init
git add .
git commit -m "feat: initial commit - ComuniK2 ecommerce landing page"
```

## 3. Crear repositorio en GitHub
Usa el GitHub CLI (`gh`) para crear el repositorio:
```bash
gh repo create comunik2 --public --source=. --push
```
Si `gh` no está instalado, instálalo con:
```bash
brew install gh   # macOS
# o
sudo apt install gh   # Linux
```
Luego autentica con `gh auth login`.

## 4. Instalar Vercel CLI si no está instalado
```bash
npm i -g vercel
```

## 5. Desplegar en Vercel
```bash
vercel --prod
```
Cuando pregunte:
- "Set up and deploy?" → Y
- "Which scope?" → selecciona tu cuenta personal
- "Link to existing project?" → N
- "What's your project's name?" → comunik2
- "In which directory is your code located?" → ./  (raíz)
- "Want to modify these settings?" → N

## 6. Verificar el deploy
Al terminar, Vercel te dará una URL tipo `https://comunik2.vercel.app`. Ábrela y confirma que carga correctamente.

## 7. (Opcional) Dominio personalizado
Si tienes un dominio propio, ejecuta:
```bash
vercel domains add tudominio.com
```

## Notas importantes:
- Este es un proyecto HTML/CSS/JS puro, **sin build step**, Vercel lo detecta automáticamente
- Las imágenes en `/images/` son placeholders — reemplázalas con las imágenes reales del cliente
- El video en `/video/producto.mp4` debe ser agregado manualmente
- El formulario de reclamaciones actualmente es frontend only — si el cliente necesita que los datos lleguen por email, integra Formspree: reemplaza `<form>` con `<form action="https://formspree.io/f/TU_ID" method="POST">`

## Para actualizar el sitio después:
```bash
git add .
git commit -m "update: descripción del cambio"
git push
# Vercel detecta el push y redespliega automáticamente
```

---

Si tienes algún error durante el proceso, muéstrame el mensaje exacto para ayudarte a resolverlo.
