# FirmaGen

Generador web de firmas para correo electrónico, desarrollado con HTML, CSS y JavaScript nativo.

**Demo:** [emanuelhg.github.io/FirmaGen](https://emanuelhg.github.io/FirmaGen/)

## Funcionalidades

- Vista previa actualizada en tiempo real.
- Descarga de la firma como imagen PNG.
- Copia de la firma como HTML para pegarla en gestores de correo compatibles.
- Logo personalizado en PNG, JPG o WebP de hasta 5 MB.
- Color de acento configurable.
- Opción para ocultar el logo, la empresa, la dirección, el teléfono o el email.
- Enlaces opcionales para sitio web, LinkedIn, Instagram y WhatsApp.
- Generación automática de las URL de LinkedIn e Instagram a partir del usuario.
- Diseño adaptable a pantallas pequeñas y formulario accesible mediante teclado.

## Uso

1. Completá los datos que querés mostrar.
2. Abrí **Personalización** si necesitás cambiar el color, ocultar elementos o agregar redes sociales.
3. Elegí **Guardar firma** para descargar un PNG o **Copiar firma HTML** para pegarla en tu correo.

Los enlaces de contacto y redes sociales son clicables únicamente en la firma HTML. En el PNG, los íconos son sólo visuales.

## Probar localmente

El proyecto no necesita instalación ni proceso de compilación. Serví la carpeta con cualquier servidor HTTP estático; por ejemplo, con Python:

```bash
python -m http.server 8765
```

Después abrí [http://localhost:8765](http://localhost:8765). Se necesita conexión a internet para cargar `html2canvas`, utilizado al generar el PNG.

## Compatibilidad

La firma HTML está preparada para pegarse en clientes como Gmail y Outlook. El resultado final puede variar según las reglas de formato de cada cliente de correo.

## Estructura

- `index.html`: formulario, vista previa y estructura de la página.
- `styles.css`: estilos de la interfaz y de la firma.
- `scripts.js`: validación, vista previa, descarga PNG y copia HTML.
- `icons/`: íconos compatibles con clientes de correo.

## Dependencias y licencias

`html2canvas` se carga desde cdnjs; los íconos de redes sociales y sitio web derivan de Font Awesome Free. Consultá [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) para conocer sus licencias.
