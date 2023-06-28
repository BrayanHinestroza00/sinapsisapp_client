export const HOST = "http://localhost:5000/api/v1";

/**
 * Mensajes por defecto
 */
export const ERR_MESSAGE_CODE_NOT_VALID = "CÓDIGO DE RESPUESTA NO VÁLIDO";
export const ERR_MESSAGE_CODE_NOT_NETWORK = "ERROR DE RED";

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
 * Archivos Estaticos
 */
export const URL_STATIC_UPLOAD_IMAGES = HOST + "/app_static/upload.png";

/**
 * Rutas usadas por el Administrador
 */
export const URL_OBTENER_INFO_ADMINISTRADOR = HOST + "/app/info_usuario";
export const URL_OBTENER_PRIMERAS_ATENCIONES_PENDIENTES =
  HOST + "/ruta_innovacion/primeraAtencion/pendientes";
export const URL_OBTENER_PROYECTOS_EMPRENDIMIENTO =
  HOST + "/ruta_innovacion/proyectos_emprendimiento";
export const URL_OBTENER_MENTORES = HOST + "/mentores";
// export const URL_OBTENER_INFORMACION_MENTORES =
//   HOST + "/ruta_innovacion/mentores";
export const URL_OBTENER_PRIMERA_ATENCION_EMP =
  HOST + "/ruta_innovacion/primeraAtencion/detalle";
export const URL_OBTENER_EMPRENDEDORES =
  HOST + "/ruta_innovacion/emprendedores";
export const URL_ASIGNAR_ETAPA_INICIAL =
  HOST + "/ruta_innovacion/primeraAtencion";
export const URL_ASIGNAR_MENTOR = HOST + "/ruta_innovacion/asignar_mentor";
export const URL_CREAR_TAREA_EMPRENDEDOR =
  HOST + "/ruta_innovacion/tareas/crear";
export const URL_CALIFICAR_TAREA_EMPRENDEDOR =
  HOST + "/ruta_innovacion/tareas/calificar";
export const URL_PROGRAMAR_CONSULTORIA_EMPRENDEDOR =
  HOST + "/ruta_innovacion/consultorias/programar";

export const URL_PUBLICAR_ANUNCIO = HOST + "/app/publicar_anuncio";

export const URL_OBTENER_TEMATICAS_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO =
  HOST + "/app/tematicas_etapa";

export const URL_OBTENER_EMPRENDEDIMIENTOS_MENTOR =
  HOST + "/mentores/emprendimientos";

export const URL_RESTABLECER_CONTRASEÑA = HOST + "/restablecer_password";
export const URL_DESACTIVAR_CUENTA = HOST + "/desactivar_usuario";
export const URL_REPORTES_FORMACION = HOST + "/reportes/indicadores_formacion";
export const URL_REPORTES_GESTION = HOST + "/reportes/indicadores_gestion";

/**
 * Rutas usadas por el Emprendedor
 */
export const URL_REGISTRAR_PRIMERA_ATENCION =
  HOST + "/emprendedor/primeraAtencion";
export const URL_ACTUALIZAR_PERFIL_EMPRENDEDOR = HOST + "/emprendedor";
export const URL_OBTENER_INFO_EMPRENDEDOR = HOST + "/emprendedor";
export const URL_OBTENER_EMPRENDEDIMIENTO =
  HOST + "/emprendedor/emprendimiento";
export const URL_ACTUALIZAR_EMPRENDIMIENTO =
  HOST + "/emprendedor/emprendimiento";
export const URL_OBTENER_EMPRENDEDIMIENTOS =
  HOST + "/emprendedor/emprendimientos";
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
export const URL_ENTREGAR_TAREA_EMPRENDEDOR =
  HOST + "/ruta_innovacion/tareas/entregar";
export const URL_OBTENER_CONSULTORIAS_PROYECTO_EMPRENDIMIENTO =
  HOST + "/ruta_innovacion/consultorias";
export const URL_OBTENER_CONSULTORIAS_PROGRAMADAS =
  HOST + "/ruta_innovacion/consultorias_programadas";

/**
 * Rutas usadas por el Mentor
 */
export const URL_OBTENER_INFO_MENTOR = HOST + "/app/info_usuario";

export const URL_OBTENER_MENTORES_POR_PROYECTO_EMPRENDIMIENTO =
  HOST + "/mentores/proyecto_emprendimiento";

export const URL_OBTENER_MENTOR_POR_PROYECTO_EMPRENDIMIENTO =
  HOST + "/mentores/proyecto_emprendimiento";

export const URL_OBTENER_EMPRENDEDORES_ASOCIADOS =
  HOST + "/mentores/emprendedores";

export const URL_OBTENER_HORARIO_MENTOR = HOST + "/mentores/horario";
export const URL_ACTUALIZAR_HORARIO_MENTOR = HOST + "/mentores/horario";
export const URL_FINALIZAR_ACOMPANAMIENTO =
  HOST + "/mentores/finalizar_acompanamiento";

/**
 * Rutas comunes
 */
export const URL_ACTUALIZAR_CONTRASENA = HOST + "/actualizar_contrasena";
export const URL_OBTENER_PROGRAMAS_ACADEMICOS =
  HOST + "/app/programas_academicos";
export const URL_OBTENER_ASIGNATURAS = HOST + "/app/asignaturas";
export const URL_OBTENER_ANUNCIOS = HOST + "/app/anuncios";
export const URL_OBTENER_REDES_SOCIALES = HOST + "/app/redes_sociales";
export const URL_OBTENER_TIPOS_DOCUMENTO = HOST + "/app/tipoDocumento";
export const URL_OBTENER_TIPOS_CONTACTO = HOST + "/app/tipoContacto";
export const URL_OBTENER_ETAPAS_RUTA_INNOVACION_EMPRENDIMIENTO =
  HOST + "/app/etapas_ruta";
export const URL_ACTUALIZAR_PERFIL_USUARIO = HOST + "/app/actualizar_perfil";

export const URL_INICIAR_CONSULTORIA =
  HOST + "/ruta_innovacion/consultorias/iniciar";
export const URL_MARCAR_INASISTENCIA_CONSULTORIA =
  HOST + "/ruta_innovacion/consultorias/inasistencia";
export const URL_TERMINAR_CONSULTORIA =
  HOST + "/ruta_innovacion/consultorias/terminar";

/**
 * Rutas de reportes
 */
export const URL_OBTENER_REPORTE_CONSULTORIAS_POR_MENTOR =
  HOST + "/reportes/consultorias_por_mentor";

/**
 * Rutas de Autenticacion
 */
export const URL_REGISTRAR_EMPRENDEDOR_INTEGRACION =
  HOST + "/SignUp/Integration";
export const URL_REGISTRAR_EMPRENDEDOR_EXTERNO = HOST + "/SignUp/Externo";
export const URL_REGISTRAR_MENTOR = HOST + "/SignUp/Mentor";
export const URL_INICIAR_SESION = HOST + "/login";
