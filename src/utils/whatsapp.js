
/**
 * @param {Object} formData 
 * @param {string} phoneNumber 
 * @param {string} locale
 * @returns {string} 
 */
export function sendToWhatsApp(formData, phoneNumber = "51914019629", locale = "en") {

  const serviceNames = {
    en: {
      "exterior-hand-wash": "Manual Exterior Wash",
      "automatic-tunnel-wash": "Automatic Tunnel Wash",
      "seat-carpet-shampooing": "Shampoo of Seats and Carpets",
      "window-cleaning": "Window Cleaning",
      "waxing-polishing": "Waxing and Polishing"
    },
    es: {
      "exterior-hand-wash": "Lavado manual exterior",
      "automatic-tunnel-wash": "Lavado automático en túnel",
      "seat-carpet-shampooing": "Shampoo de asientos y tapizados",
      "window-cleaning": "Limpieza de ventanas",
      "waxing-polishing": "Cera y pulido"
    }
  }

  const labels = {
    en: {
      title: "*New Car Wash Service Inquiry*",
      client: "*Client:*",
      phone: "*Phone:*",
      car: "*Car:*",
      model: "*Model:*",
      serviceDate: "*Service Date:*",
      requestedServices: "*Requested Services:*",
      noServices: "No services selected",
      notSpecified: "Not specified"
    },
    es: {
      title: "*Nueva Consulta de Servicio de Car Wash*",
      client: "*Cliente:*",
      phone: "*Teléfono:*",
      car: "*Carro:*",
      model: "*Modelo:*",
      serviceDate: "*Fecha del Servicio:*",
      requestedServices: "*Servicios Solicitados:*",
      noServices: "Ningún servicio seleccionado",
      notSpecified: "No especificado"
    }
  }

  // usar el idioma en el que se abre el formulario
  const currentLabels = labels[locale] || labels.en;
  const currentServiceNames = serviceNames[locale] || serviceNames.en;

  // Formatear los servicios seleccionados
  const selectedServices = formData.servicios || [];
  const servicesText = selectedServices.length > 0
    ? selectedServices.map(service => currentServiceNames[service]).join(", ")
    : currentLabels.noServices;

  // Crear mensaje formateado
  const message = `${currentLabels.title}

  ${currentLabels.client} ${formData.nombre || currentLabels.notSpecified}
  ${currentLabels.phone} ${formData.numero || currentLabels.notSpecified}
  ${currentLabels.car} ${formData.carro || currentLabels.notSpecified}
  ${currentLabels.model} ${formData.modelo || currentLabels.notSpecified}
  ${currentLabels.serviceDate} ${formData.fecha || currentLabels.notSpecified}

  ${currentLabels.requestedServices}
  ${servicesText}`;

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return whatsappURL;
}

/**
 * Función para abrir WhatsApp en nueva ventana con los datos del formulario
 * @param {Object} formData 
 * @param {string} phoneNumber 
 * @param {string} locale
 */
export function openWhatsApp(formData, phoneNumber = "51914019629", locale = "en") {
  const whatsappURL = sendToWhatsApp(formData, phoneNumber, locale);
  window.open(whatsappURL, '_blank');
}

/**
 * Función para manejar el envío del formulario
 * @param {Event} event 
 * @param {string} phoneNumber
 * @param {string} locale
 */
export function handleFormSubmit(event, phoneNumber = "51914019629", locale = "en") {
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

  openWhatsApp(data, phoneNumber, locale);
}
