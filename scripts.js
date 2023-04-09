// Datos del formulario:
// Asigna los valores de los campos de entrada a los elementos de salida correspondientes.
// Si un campo está vacío, se asigna un valor predeterminado.

function manejarEntrada(idEntrada, idSalida, textoPredeterminado) {
  const entrada = $(`#${idEntrada}`).val() === '' ? textoPredeterminado : $(`#${idEntrada}`).val();
  $(`#${idSalida}`).html(entrada);
}

$('#nombreIn').on('input', () => manejarEntrada('nombreIn', 'nombreOut', 'Nombre y Apellido'));

$('#sectorIn').on('input', () => manejarEntrada('sectorIn', 'sectorOut', 'Empresa o Sector'));

$('#dirIn').on('input', () => manejarEntrada('dirIn', 'dirOut', 'Dirección (CP). Localidad - Provincia.'));

$('#telIn').on('input', () => manejarEntrada('telIn', 'telOut', '(Caract) Número de Tel + Interno'));

// Captura los datos de formulario y genera un archivo PNG con la imagen de la firma:

const $boton = document.querySelector("#btnCapturar"), // Selecciona el botón de captura.
  $objetivo = document.querySelector("#firmaCaptura"); // Selecciona la tabla que contiene la firma.

// Agrega un event listener al botón de captura:

$boton.addEventListener("click", () => {
  html2canvas($objetivo).then(canvas => { // Usa la librería html2canvas para capturar la firma.
    let enlace = document.createElement('a'); // Crea un elemento <a> para descargar la imagen como un archivo PNG.
    const nombreArchivo = `firma - ${($("#nombreOut").text())}.png`; // Asigna un nombre al archivo.
    enlace.download = nombreArchivo;
    enlace.href = canvas.toDataURL(); // Convierte la imagen a Base64.
    enlace.click(); // Descarga la imagen como un archivo PNG.
  }); 
});