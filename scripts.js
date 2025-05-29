// Datos del formulario:
// Asigna los valores de los campos de entrada a los elementos de salida correspondientes.
// Si un campo está vacío, se asigna un valor predeterminado.

function manejarEntrada(idEntrada, idSalida, textoPredeterminado) {
  const entrada = $(`#${idEntrada}`).val() === '' ? textoPredeterminado : $(`#${idEntrada}`).val();
  $(`#${idSalida}`).html(entrada);
}

$('#nombreIn').on('input', () => manejarEntrada('nombreIn', 'nombreOut', 'Nombre y Apellido'));
$('#sectorIn').on('input', () => manejarEntrada('sectorIn', 'sectorOut', 'Empresa o Sector'));
$('#dirIn').on('input', () => $('#dirText').text($('#dirIn').val() === '' ? 'Dirección (CP). Localidad - Provincia.' : $('#dirIn').val()));
$('#telIn').on('input', () => $('#telText').text($('#telIn').val() === '' ? '(Caract) Número de Tel + Interno' : $('#telIn').val()));
$('#emailIn').on('input', () => $('#emailText').text($('#emailIn').val() === '' ? 'correo@ejemplo.com' : $('#emailIn').val()));

// Logo personalizado
$('#logoIn').on('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      $('#logoFirma').attr('src', evt.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    $('#logoFirma').attr('src', 'logo_empresa.png');
  }
});

// Captura los datos de formulario y genera un archivo PNG con la imagen de la firma:

const $boton = document.querySelector("#btnCapturar"), // Selecciona el botón de captura.
  $objetivo = document.querySelector("#firmaCaptura"); // Selecciona la tabla que contiene la firma.

// Agrega un event listener al botón de captura:

$boton.addEventListener("click", () => {
  // Mejora: aumentar la escala para mayor calidad
  html2canvas($objetivo, { scale: 2 }).then(canvas => { // Usa la librería html2canvas para capturar la firma con mayor resolución.
    let enlace = document.createElement('a'); // Crea un elemento <a> para descargar la imagen como un archivo PNG.
    const nombreArchivo = `firma - ${($("#nombreOut").text())}.png`; // Asigna un nombre al archivo.
    enlace.download = nombreArchivo;
    enlace.href = canvas.toDataURL(); // Convierte la imagen a Base64.
    enlace.click(); // Descarga la imagen como un archivo PNG.
  }); 
});
