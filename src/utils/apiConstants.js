const HOST = "http://localhost:5000/api/v1";

/**
 * Mensajes por defecto
 */
export const ERR_MESSAGE_CODE_NOT_VALID = "CÓDIGO DE RESPUESTA NO VÁLIDO";

/**
 * Métodos HTTP
 */
export const HTTP_METHOD_GET = "GET";
export const HTTP_METHOD_POST = "POST";
export const HTTP_METHOD_PUT = "PUT";
export const HTTP_METHOD_DELETE = "DELETE";

/**
 * Response Codes
 */

export const CODE_OK = 1;
export const CODE_NO_CHANGES = 0;
export const CODE_ERR = -1;

/**
 * Rutas usadas por el Emprendedor
 */
// export const URL_REGISTRAR_PRIMERA_ATENCION =
//   HOST + "/emprendedor/primeraAtencion";
export const URL_REGISTRAR_PRIMERA_ATENCION = HOST + "/emprendedor";
export const URL_OBTENER_INFO_EMPRENDEDOR = HOST + "/emprendedor";
export const URL_OBTENER_EMPRENDEDIMIENTO =
  HOST + "/emprendedor/emprendimiento";
export const URL_OBTENER_INFO_SESION_EMPRENDEDOR =
  HOST + "/app/preload/emprendedor";
export const URL_OBTENER_ETAPA_PROYECTO_EMPRENDEDOR =
  HOST + "/ruta_innovacion/etapa_emprendedimiento";
export const URL_OBTENER_ACTIVIDADES_ETAPA_RUTA =
  HOST + "/ruta_innovacion/etapa/actividades";
export const URL_OBTENER_HERRAMIENTAS_ETAPA_RUTA =
  HOST + "/ruta_innovacion/etapa/herramientas";
export const URL_OBTENER_ACTIVIDADES_EMPRENDEDOR =
  HOST + "/ruta_innovacion/actividades_emprendedimiento";
export const URL_OBTENER_SUB_ACTIVIDADES_EMPRENDEDOR =
  HOST + "/ruta_innovacion/subactividades_emprendedimiento";
export const URL_OBTENER_TAREAS_PROYECTO_EMPRENDIMIENTO =
  HOST + "/ruta_innovacion/tareas";
export const URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO =
  HOST + "/ruta_innovacion/consultorias";
export const URL_OBTENER_CONSULTORIAS_PROGRAMADAS =
  HOST + "/ruta_innovacion/consultorias_programadas";

/**
 * Rutas usadas por el Mentor
 */
export const URL_OBTENER_MENTORES_POR_PROYECTO_EMPRENDIMIENTO =
  HOST + "/mentores/proyecto_emprendimiento";

export const URL_OBTENER_MENTOR_POR_PROYECTO_EMPRENDIMIENTO =
  HOST + "/mentores/proyecto_emprendimiento";

export const URL_OBTENER_EMPRENDEDORES_ASOCIADOS =
  HOST + "/mentores/emprendedores";

export const URL_OBTENER_HORARIO_MENTOR = HOST + "/mentores/horario";

/**
 * Rutas comunes
 */
export const URL_OBTENER_PROGRAMAS_ACADEMICOS =
  HOST + "/app/programas_academicos";
export const URL_OBTENER_ASIGNATURAS = HOST + "/app/asignaturas";
export const URL_OBTENER_REDES_SOCIALES = HOST + "/app/redes_sociales";
export const URL_OBTENER_TIPOS_DOCUMENTO = HOST + "/app/tipoDocumento";

/**
 * Rutas de reportes
 */
export const URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR =
  HOST + "/reportes/consultorias_por_mentor";
