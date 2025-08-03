
/**
 * @param {Object} formData 
 * @param {string} phoneNumber 
 * @param {string} locale
 * @returns {string} 
 */
export function sendToWhatsApp(formData, phoneNumber = "51901617809", locale = "en") {

  const serviceNames = {
    en: {
      // Paquetes
      "salon-wash-service": "Salon Wash Service",
      "basic-package": "Basic Package",
      "premium-package": "Premium Package",
      "detailed-package": "Detailed Package",
      
      // Servicios individuales
      "seat-washing": "Seat Washing",
      "carpet-washing": "Carpet Washing",
      "ceiling-washing": "Ceiling Washing",
      "door-washing": "Door Washing",
      "body-washing": "Body Washing",
      "vacuuming": "Vacuuming of carpets, seats and trunk",
      "interior-cleaning": "Interior cleaning of doors and dashboard",
      "plastic-conditioner": "Conditioner for interior and exterior plastic parts",
      "air-application": "Air application to mirrors and handles",
      "tire-conditioner": "Tire conditioner",
      "fragrance": "Fragrance",
    },
    es: {
      // Paquetes
      "salon-wash-service": "Servicio de lavado de salón",
      "basic-package": "Paquete básico",
      "premium-package": "Paquete premium",
      "detailed-package": "Paquete detallado",
      
      // Servicios individuales
      "seat-washing": "Lavado de asientos",
      "carpet-washing": "Lavado de alfombras",
      "ceiling-washing": "Lavado de techo",
      "door-washing": "Lavado de puertas",
      "body-washing": "Lavado de carrocería",
      "vacuuming": "Aspirado de alfombras, asientos y maletero",
      "interior-cleaning": "Limpieza interior de puertas y tablero",
      "plastic-conditioner": "Acondicionador a las partes plásticas interior e exterior",
      "air-application": "Aplicación de aire a los espejos y manijas",
      "tire-conditioner": "Acondicionador de neumáticos",
      "fragrance": "Aromatizado",
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
export function openWhatsApp(formData, phoneNumber = "51901617809", locale = "en") {
  const whatsappURL = sendToWhatsApp(formData, phoneNumber, locale);
  window.open(whatsappURL, '_blank');
}

/**
 * Función para manejar el envío del formulario
 * @param {Event} event 
 * @param {string} phoneNumber
 * @param {string} locale
 */
export function handleFormSubmit(event, phoneNumber = "51901617809", locale = "en") {
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
