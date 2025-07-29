
/**
 * @param {Object} formData 
 * @param {string} phoneNumber 
 * @returns {string} 
 */
export function sendToWhatsApp(formData, phoneNumber = "51914019629") {

  const serviceNames = {
    "exterior-hand-wash": "Manual Exterior Wash",
    "automatic-tunnel-wash": "Automatic Tunnel Wash",
    "seat-carpet-shampooing": "Shampoo of Seats and Carpets",
    "window-cleaning": "Window Cleaning",
    "waxing-polishing": "Waxing and Polishing"
  }

  // Formatear los servicios seleccionados
  const selectedServices = formData.servicios || [];
  const servicesText = selectedServices.length > 0
    ? selectedServices.map(service => serviceNames[service]).join(", ")
    : "Ningún servicio seleccionado";

  // Crear mensaje formateado
  const message = `*Nueva Consulta de Servicio de Car Wash*

  *Cliente:* ${formData.nombre || "No especificado"}
  *Teléfono:* ${formData.numero || "No especificado"}
  *Carro:* ${formData.carro || "No especificado"}
  *Modelo:* ${formData.modelo || "No especificado"}
  *Fecha del Servicio:* ${formData.fecha || "No especificado"}

  *Servicios Solicitados:*
  ${servicesText}

  ---
  *Enviado desde el formulario web*`;

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return whatsappURL;
}

/**
 * Función para abrir WhatsApp en nueva ventana con los datos del formulario
 * @param {Object} formData - Datos del formulario
 * @param {string} phoneNumber - Número de WhatsApp (formato: 1234567890)
 */
export function openWhatsApp(formData, phoneNumber = "1234567890") {
  const whatsappURL = sendToWhatsApp(formData, phoneNumber);
  window.open(whatsappURL, '_blank');
}

/**
 * Función para manejar el envío del formulario
 * @param {Event} event - Evento del formulario
 * @param {string} phoneNumber - Número de WhatsApp (formato: 1234567890)
 */
export function handleFormSubmit(event, phoneNumber = "1234567890") {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    nombre: formData.get('nombre'),
    numero: formData.get('numero'),
    carro: formData.get('carro'),
    modelo: formData.get('modelo'),
    fecha: formData.get('fecha'),
    servicios: formData.getAll('servicios')
  };

  openWhatsApp(data, phoneNumber);
}
