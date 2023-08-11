export const REGEX_PATTERN_SOLO_LETRAS =
  /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\s\D].{1,2000}$/;

export const REGEX_PATTERN_SOLO_NUMEROS = /^([0-9])*$/;

export const REGEX_PATTERN_NUMERO_DOCUMENTO = /^\D*\d{8,12}$/;

export const REGEX_PATTERN_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

export const REGEX_PATTERN_NUMERO_TELEFONO = /^\D*\d{1,10}$/;

export const REGEX_PATTERN_CORREO_ELECTRONICO =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const REGEX_PATTERN_CARACTERES =
  /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\s\D].{1,2000}$/;
