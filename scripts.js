// Datos del formulario:

$('#nombreIn').on('input', (e) => {
  const nombre = $(e.target).val() === '' ? 'Nombre y Apellido' : $(e.target).val();
  $("#nombreOut").html(nombre);
});

$('#sectorIn').on('input', (e) => {
  const sector = $(e.target).val() === '' ? 'Empresa o Sector' : $(e.target).val();
  $("#sectorOut").html(sector);
});

$('#dirIn').on('input', (e) => {
  const dir = $(e.target).val() === '' ? 'Dirección (CP). Localidad - Provincia.' : $(e.target).val();
  $("#dirOut").html(dir);
});


$('#telIn').on('input', (e) => {
  const tel = $(e.target).val() === '' ? '(Caract) Número de Tel + Interno' : $(e.target).val();
  $("#telOut").html(tel);
});

// Captura de datos de formulario y generación de PNG:

const $boton = document.querySelector("#btnCapturar"), // Selecciona el botón.
$objetivo = document.querySelector("#firmaCaptura"); //  Selecciona la tabla que contiene la firma.

// Agrega event listener al botón:

$boton.addEventListener("click", () => {
  html2canvas($objetivo) // Llama a la librería html2canvas para capturar la firma.
    .then(canvas => {
      // Crea un elemento <a>
      let enlace = document.createElement('a');
      enlace.download = `firma - ${document.querySelector("#nombreOut").textContent}.png`; //nombre del archivo.
      // Convierte la imagen a Base64.
      enlace.href = canvas.toDataURL();
      enlace.click();
    });
});