const MAX_LOGO_BYTES = 5 * 1024 * 1024;
const TIPOS_LOGO = ["image/png", "image/jpeg", "image/webp"];
const LOGO_PREDETERMINADO = "logo_empresa.png";
const BASE_PUBLICA = "https://emanuelhg.github.io/FirmaGen";

const firma = document.querySelector("#firmaCaptura");
const formulario = document.querySelector("#firmaForm");
const logoEntrada = document.querySelector("#logoIn");
const logoFirma = document.querySelector("#logoFirma");
const estado = document.querySelector("#estado");
const botonGuardar = document.querySelector("#btnCapturar");
const botonCopiar = document.querySelector("#btnCopiar");

function mostrarEstado(mensaje, esError = false) {
  estado.textContent = mensaje;
  estado.classList.toggle("error", esError);
}

function actualizarTexto(idEntrada, idSalida, textoPredeterminado) {
  const entrada = document.querySelector(`#${idEntrada}`);
  const salida = document.querySelector(`#${idSalida}`);

  entrada.addEventListener("input", () => {
    salida.textContent = entrada.value.trim() || textoPredeterminado;
  });
}

function actualizarEnlace(idEntrada, idSalida, textoPredeterminado, protocolo) {
  const entrada = document.querySelector(`#${idEntrada}`);
  const salida = document.querySelector(`#${idSalida}`);

  entrada.addEventListener("input", () => {
    const valor = entrada.value.trim();
    salida.textContent = valor || textoPredeterminado;

    if (valor) {
      salida.href = `${protocolo}:${valor}`;
    } else {
      salida.removeAttribute("href");
    }
  });
}

actualizarTexto("nombreIn", "nombreOut", "Nombre y Apellido");
actualizarTexto("sectorIn", "sectorOut", "Empresa o Sector");
actualizarTexto("dirIn", "dirText", "Dirección (CP). Localidad - Provincia.");
actualizarEnlace("telIn", "telText", "(Caract) Número de Tel + Interno", "tel");
actualizarEnlace("emailIn", "emailText", "correo@ejemplo.com", "mailto");

const redes = [
  { id: "webIn", nombre: "Sitio web", icono: "website", obtenerHref: normalizarUrl },
  { id: "linkedinIn", nombre: "LinkedIn", icono: "linkedin", obtenerHref: normalizarLinkedIn },
  { id: "instagramIn", nombre: "Instagram", icono: "instagram", obtenerHref: normalizarInstagram },
  { id: "whatsappIn", nombre: "WhatsApp", icono: "whatsapp", obtenerHref: normalizarWhatsApp },
];
const filaSocial = document.querySelector("#socialRow");
const salidaSocial = document.querySelector("#socialOut");
const cajaLogo = document.querySelector(".logoBox");

function normalizarUrl(valor) {
  if (!valor) {
    return null;
  }

  try {
    const url = new URL(/^https?:\/\//i.test(valor) ? valor : `https://${valor}`);
    const dominioValido = url.hostname.includes(".") && !url.hostname.includes("%");
    return ["http:", "https:"].includes(url.protocol) && dominioValido ? url.href : null;
  } catch {
    return null;
  }
}

function normalizarWhatsApp(valor) {
  const numero = valor.replace(/\D/g, "");
  return numero.length >= 8 ? `https://wa.me/${numero}` : null;
}

function normalizarUsuarioSocial(valor, dominio, ruta, patron) {
  if (!valor) {
    return null;
  }

  if (/^https?:\/\//i.test(valor) || valor.toLowerCase().includes(`${dominio}/`)) {
    const href = normalizarUrl(valor);

    if (!href) {
      return null;
    }

    const hostname = new URL(href).hostname.toLowerCase();
    return hostname === dominio || hostname.endsWith(`.${dominio}`) ? href : null;
  }

  const usuario = valor.replace(/^@/, "").replace(/\/+$/, "");
  return patron.test(usuario) ? `https://www.${dominio}/${ruta}${encodeURIComponent(usuario)}/` : null;
}

function normalizarLinkedIn(valor) {
  return normalizarUsuarioSocial(valor, "linkedin.com", "in/", /^[a-zA-Z0-9._-]+$/);
}

function normalizarInstagram(valor) {
  return normalizarUsuarioSocial(valor, "instagram.com", "", /^[a-zA-Z0-9._]+$/);
}

function actualizarRedes() {
  salidaSocial.replaceChildren();
  let cantidad = 0;

  redes.forEach(({ id, nombre, icono, obtenerHref }) => {
    const entrada = document.querySelector(`#${id}`);
    const valor = entrada.value.trim();
    const href = obtenerHref(valor);
    const invalido = Boolean(valor && !href);

    entrada.setCustomValidity(invalido ? `Ingresá un enlace o número válido para ${nombre}.` : "");
    entrada.setAttribute("aria-invalid", String(invalido));

    if (!href) {
      return;
    }

    const enlace = document.createElement("a");
    const imagen = document.createElement("img");

    enlace.className = "redSocial";
    enlace.href = href;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.setAttribute("aria-label", nombre);
    imagen.className = "redIcon";
    imagen.src = `icons/${icono}.png`;
    imagen.alt = "";
    imagen.width = 18;
    imagen.height = 18;
    imagen.dataset.icono = icono;
    enlace.append(imagen);
    salidaSocial.append(enlace);
    cantidad += 1;
  });

  filaSocial.hidden = cantidad === 0;
  cajaLogo.rowSpan = cantidad === 0 ? 5 : 6;
}

redes.forEach(({ id }) => document.querySelector(`#${id}`).addEventListener("input", actualizarRedes));
actualizarRedes();

document.querySelectorAll('input[name="paleta"]').forEach((opcion) => {
  opcion.addEventListener("change", () => {
    firma.style.setProperty("--acento-firma", opcion.value);
  });
});

function leerComoDataUrl(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(new Error("No se pudo leer el archivo."));
    lector.readAsDataURL(archivo);
  });
}

const iconosListos = Promise.all(
  redes.map(async ({ icono }) => {
    const respuesta = await fetch(`icons/${icono}.png`);

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los iconos de redes sociales.");
    }

    return [icono, await leerComoDataUrl(await respuesta.blob())];
  }),
).then(Object.fromEntries);

function esperarImagen(imagen) {
  if (imagen.complete && imagen.naturalWidth > 0) {
    return Promise.resolve();
  }

  if (imagen.decode) {
    return imagen.decode();
  }

  return new Promise((resolve, reject) => {
    imagen.addEventListener("load", resolve, { once: true });
    imagen.addEventListener("error", reject, { once: true });
  });
}

async function cargarLogo(archivo) {
  try {
    if (!archivo) {
      logoFirma.src = LOGO_PREDETERMINADO;
      await esperarImagen(logoFirma);
      mostrarEstado("");
      return;
    }

    if (!TIPOS_LOGO.includes(archivo.type)) {
      throw new Error("El logo debe ser PNG, JPG o WebP.");
    }

    if (archivo.size > MAX_LOGO_BYTES) {
      throw new Error("El logo no puede superar los 5 MB.");
    }

    logoFirma.src = await leerComoDataUrl(archivo);
    await esperarImagen(logoFirma);
    mostrarEstado("Logo cargado correctamente.");
  } catch (error) {
    logoEntrada.value = "";
    logoFirma.src = LOGO_PREDETERMINADO;
    await esperarImagen(logoFirma);
    mostrarEstado(error.message || "No se pudo cargar el logo.", true);
  }
}

let logoListo = esperarImagen(logoFirma);
logoEntrada.addEventListener("change", () => {
  logoListo = cargarLogo(logoEntrada.files[0]);
});
formulario.addEventListener("submit", (evento) => evento.preventDefault());

function validarFormulario() {
  return formulario.reportValidity();
}

function nombreArchivoSeguro() {
  const nombre = document.querySelector("#nombreOut").textContent.trim();
  const nombreSeguro = nombre
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/[. ]+$/g, "")
    .slice(0, 80);

  return `firma - ${nombreSeguro || "sin nombre"}.png`;
}

function canvasComoBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("No se pudo crear la imagen PNG."));
      }
    }, "image/png");
  });
}

function bloquearBotones(bloqueados) {
  botonGuardar.disabled = bloqueados;
  botonCopiar.disabled = bloqueados;
}

async function guardarFirma() {
  if (!validarFormulario()) {
    return;
  }

  bloquearBotones(true);
  mostrarEstado("Generando la firma…");

  try {
    await logoListo;

    if (typeof html2canvas !== "function") {
      throw new Error("No se pudo cargar el generador de imágenes.");
    }

    const canvas = await html2canvas(firma, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });
    const blob = await canvasComoBlob(canvas);
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");

    enlace.download = nombreArchivoSeguro();
    enlace.href = url;
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    mostrarEstado("Firma descargada correctamente.");
  } catch (error) {
    mostrarEstado(error.message || "No se pudo generar la firma.", true);
  } finally {
    bloquearBotones(false);
  }
}

function crearFirmaHtml(iconos) {
  const copia = firma.cloneNode(true);
  const logoOriginal = logoFirma.src.startsWith("data:") ? logoFirma.src : `${BASE_PUBLICA}/${LOGO_PREDETERMINADO}`;
  const acento = getComputedStyle(firma).getPropertyValue("--acento-firma").trim() || "#0f766e";

  if (filaSocial.hidden) {
    copia.querySelector("#socialRow").remove();
  }

  copia.removeAttribute("id");
  copia.setAttribute("role", "presentation");
  copia.style.cssText =
    "width:550px;table-layout:fixed;border-collapse:collapse;color:#212529;background:#fff;font-family:Arial,Helvetica,sans-serif;font-size:14px;";

  copia.querySelector(".colLogo").style.width = "150px";
  copia.querySelector(".colFirma").style.width = "400px";
  copia.querySelectorAll("td").forEach((celda) => {
    celda.style.cssText = "padding:2px 4px;vertical-align:middle;";
  });

  const cajaLogo = copia.querySelector(".logoBox");
  cajaLogo.style.textAlign = "center";

  const logo = copia.querySelector("img");
  logo.src = logoOriginal;
  logo.width = 120;
  logo.height = 120;
  logo.style.cssText = "display:block;width:120px;height:120px;margin:0 auto;object-fit:contain;";

  copia.querySelector(".nombreFirma").style.cssText = `font-weight:700;color:${acento};`;
  copia.querySelectorAll("a").forEach((enlace) => {
    enlace.style.cssText = "color:#212529;text-decoration:none;";
  });
  copia.querySelectorAll(".icono").forEach((icono) => {
    icono.style.cssText =
      `display:inline-block;margin-right:5px;color:${acento};font-family:Arial,Helvetica,sans-serif;line-height:1;`;
  });
  copia.querySelectorAll(".redSocial").forEach((enlace) => {
    enlace.style.cssText = "display:inline-block;margin:0 7px 3px 0;text-decoration:none;vertical-align:middle;";
  });
  copia.querySelectorAll(".redIcon").forEach((icono) => {
    icono.src = iconos[icono.dataset.icono];
    icono.style.cssText = "display:block;width:18px;height:18px;border:0;";
    icono.removeAttribute("data-icono");
  });

  copia.querySelectorAll("[id]").forEach((elemento) => elemento.removeAttribute("id"));
  copia.querySelectorAll("[class]").forEach((elemento) => elemento.removeAttribute("class"));

  return copia.outerHTML;
}

async function copiarFirma() {
  if (!validarFormulario()) {
    return;
  }

  bloquearBotones(true);
  mostrarEstado("Copiando la firma…");

  try {
    await logoListo;

    if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
      throw new Error("Este navegador no permite copiar firmas con formato.");
    }

    const html = crearFirmaHtml(await iconosListos);
    const texto = firma.innerText;
    const contenido = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([texto], { type: "text/plain" }),
    });

    await navigator.clipboard.write([contenido]);
    mostrarEstado("Firma HTML copiada. Pegala directamente en tu correo.");
  } catch (error) {
    mostrarEstado(error.message || "No se pudo copiar la firma.", true);
  } finally {
    bloquearBotones(false);
  }
}

botonGuardar.addEventListener("click", guardarFirma);
botonCopiar.addEventListener("click", copiarFirma);
