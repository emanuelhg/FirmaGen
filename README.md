## FirmaGen

**Demo:** [https://emanuelhg.github.io/FirmaGen/](https://emanuelhg.github.io/FirmaGen/)

El código está realizado con **HTML**, **CSS** y **JavaScript nativo**. Es una página web que permite generar una firma personalizada para correo electrónico a partir de los datos ingresados en un formulario.

Se utiliza la librería **html2canvas** para generar la imagen de la firma. El proyecto no requiere instalación, proceso de compilación ni otras dependencias.

El código JavaScript actualiza la vista previa en tiempo real, valida el logo y los enlaces, permite personalizar el color y gestiona la descarga o copia de la firma.

Una vez ingresados los datos, se puede:

- Usar **Guardar firma** para descargar una imagen PNG.
- Usar **Copiar firma HTML** para pegar una versión con texto y enlaces directamente en un gestor de correo compatible.

### Mejoras recientes

- Permite subir un logo personalizado para la firma (campo de archivo en el formulario).
- Se agregó el campo de email, que se muestra en la firma con ícono.
- Se agregaron íconos representativos para teléfono y email en la firma.
- El logo se muestra en mejor calidad en la imagen descargada (mayor resolución y tamaño fijo).
- Se agregó validación de tipo y tamaño para logos personalizados.
- Se mejoró la adaptación a pantallas pequeñas y la accesibilidad del formulario.
- Se eliminaron Bootstrap, jQuery y la copia obsoleta de html2canvas.
- Se agregaron cuatro paletas de color y enlaces opcionales para sitio web, LinkedIn, Instagram y WhatsApp. Para LinkedIn e Instagram alcanza con ingresar el usuario; la URL se genera automáticamente.

Los enlaces de contacto y redes sociales son clicables únicamente en la firma copiada como HTML. En el archivo PNG se muestran sólo como elementos visuales.
