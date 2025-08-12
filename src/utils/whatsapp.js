
/**
 * @param {Object} formData 
 * @param {string} phoneNumber 
 * @param {string} locale
 * @returns {string} 
 */
export function sendToWhatsApp(formData, phoneNumber = "12792727136", locale = "en") {

  const serviceNames = {
    en: {
      // Paquetes
      "basic-package": "Basic Package",
      "premium-package": "Premium Package",
      "salon-wash-service": "Salon Wash Service",
      
      // Servicios individuales
      "seat-cleaning": "Seat Cleaning",
      "carpet-cleaning": "Carpet Cleaning",
      "ceiling-washing": "Ceiling stain removal",
      "interior-plastics-cleaning": "Cleaning and conditioning of interior plastics",
      "bodywork-cleaning": "Bodywork Cleaning",
      "detailed-engine-cleaning": "Detailed engine cleaning",
      "paint-correction": "Paint correction",
      "polish-application": "Polish application",
    },
    es: {
      // Paquetes
      "basic-package": "Paquete básico",
      "premium-package": "Paquete premium",
      "salon-wash-service": "Servicio de lavado de salón",
      
      // Servicios individuales
      "seat-cleaning": "Lavado de asientos",
      "carpet-cleaning": "Lavado de alfombras",
      "ceiling-washing": "Desmanchado de techo",
      "interior-plastics-cleaning": "Lavado y acondicionamiento de plásticos internos",
      "bodywork-cleaning": "Lavado de carrocería",
      "detailed-engine-cleaning": "Lavado de motor al detalle",
      "paint-correction": "Corrección de pintura",
      "polish-application": "Aplicación de polish",
    }
  }

  const labels = {
    en: {
      title: "*New Car Wash Service Inquiry*",
      client: "*Client:*",
      phone: "*Phone:*",
      car: "*Car:*",
      ubicacion: "*Ubicación:*",
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
      ubicacion: "*Ubicación:*",
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
  ${currentLabels.ubicacion} ${formData.ubicacion || currentLabels.notSpecified}
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
export function openWhatsApp(formData, phoneNumber = "12792727136", locale = "en") {
  const whatsappURL = sendToWhatsApp(formData, phoneNumber, locale);
  window.open(whatsappURL, '_blank');
}

/**
 * Función para manejar el envío del formulario
 * @param {Event} event 
 * @param {string} phoneNumber
 * @param {string} locale
 */
export function handleFormSubmit(event, phoneNumber = "12792727136", locale = "en") {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    nombre: formData.get('nombre'),
    numero: formData.get('numero'),
    carro: formData.get('carro'),
    ubicacion: formData.get('ubicacion'),
    fecha: formData.get('fecha'),
    servicios: formData.getAll('servicios')
  };

  openWhatsApp(data, phoneNumber, locale);
}
