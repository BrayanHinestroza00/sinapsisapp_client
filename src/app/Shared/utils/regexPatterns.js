export const REGEX_PATTERN_SOLO_LETRAS =
  /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ ]+$/;

export const REGEX_PATTERN_SOLO_NUMEROS = /^([0-9])*$/;

export const REGEX_PATTERN_NUMERO_DOCUMENTO = /^\D*\d{5,11}$/;
export const REGEX_PATTERN_PASSWORD = /^(?=.*\d).{4,12}$/;
export const REGEX_PATTERN_NUMERO_TELEFONO = /^\D*\d{1,10}$/;
export const REGEX_PATTERN_CORREO_ELECTRONICO =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
export const REGEX_PATTERN_CARATERETES =
  /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\s\D].{1,200}$/;
