## FirmaGen

El código se encuentra realizado con **HTML**, **CSS** y **JavaScript**. Es una página web que ofrece la funcionalidad de generar una firma para correo electrónico personalizada a partir de los datos que se ingresan en un formulario para luego volcarse en un archivo de imagen.

Se hace uso de **Bootstrap** para el diseño y de la librería **html2canvas** para la generación de la imagen de la firma.

El código JavaScript se encarga de manejar las acciones y eventos que ocurren. Concretamente, se encarga de actualizar la vista previa de la firma en tiempo real mientras se van ingresando los datos en el formulario. Para ello, se registran los eventos de input en cada uno de los campos del formulario y se actualiza la vista previa con los datos ingresados.

Una vez que se han ingresado todos los datos, se hace clic en el botón "Guardar firma" y se utiliza la librería html2canvas para capturar la vista previa de la firma y generar una imagen (PNG) de la misma. La imagen se descarga en el dispositivo del usuario para que pueda ser incrustada en su gestor de correo electrónico de preferencia.
