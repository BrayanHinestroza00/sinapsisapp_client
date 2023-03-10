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

/**
 * Rutas comunes
 */
export const URL_OBTENER_PROGRAMAS_ACADEMICOS =
  HOST + "/app/programas_academicos";
export const URL_OBTENER_ASIGNATURAS = HOST + "/app/asignaturas";
