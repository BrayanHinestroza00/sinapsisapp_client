import Axios from "axios";
import {
  SINAPSIS_APP_DIA_SEMANA_LUNES,
  SINAPSIS_APP_DIA_SEMANA_MARTES,
  SINAPSIS_APP_DIA_SEMANA_MIERCOLES,
  SINAPSIS_APP_DIA_SEMANA_JUEVES,
  SINAPSIS_APP_DIA_SEMANA_VIERNES,
  SINAPSIS_APP_DIA_SEMANA_SABADO,
  T_SINAPSIS_ETAPAS_RUTA_ARRANCAR,
  T_SINAPSIS_ETAPAS_RUTA_ARRANCAR_NOMBRE,
  T_SINAPSIS_ETAPAS_RUTA_PENSAR,
  T_SINAPSIS_ETAPAS_RUTA_PENSAR_NOMBRE,
  T_SINAPSIS_ETAPAS_RUTA_SONAR,
  T_SINAPSIS_ETAPAS_RUTA_SONAR_NOMBRE,
  T_SINAPSIS_ETAPAS_RUTA_TESTEAR,
  T_SINAPSIS_ETAPAS_RUTA_TESTEAR_NOMBRE,
  SINAPSIS_APP_FORMATO_FECHA,
  SINAPSIS_APP_ADM_ROLE_ID,
  SINAPSIS_APP_ADM_ROLE_NAME,
  SINAPSIS_APP_MNT_ROLE_ID,
  SINAPSIS_APP_MNT_ROLE_NAME,
  SINAPSIS_APP_EMP_ROLE_ID,
  SINAPSIS_APP_EMP_ROLE_NAME,
} from "src/app/Shared/utils/constants.js";
import { HOST } from "src/app/Shared/utils/apiConstants.js";
import moment from "moment";

export function getCurrentDateForBirth(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear() - 15; //Tener 15 anhos
  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

export function getCurrentTime(separator = ":") {
  let newDate = new Date();
  let hour = newDate.getHours();
  let min = newDate.getMinutes();
  return `${hour}${separator}${min}`;
}

export function getCurrentDateTime({
  monthSeparator = "-",
  separator = ":",
  space = true,
}) {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let hour = newDate.getHours();
  let min = newDate.getMinutes();

  return `${year}${monthSeparator}${
    month < 10 ? `0${month}` : `${month}`
  }${monthSeparator}${date < 10 ? `0${date}` : `${date}`}${
    space ? " " : "T"
  }${hour}${separator}${min}`;
}

export function compareWithCurrentDate(fecha) {
  let actualDate = moment(
    moment().format(SINAPSIS_APP_FORMATO_FECHA),
    SINAPSIS_APP_FORMATO_FECHA
  );
  let dateA = moment(fecha, SINAPSIS_APP_FORMATO_FECHA);

  return dateA.isSame(actualDate);
}

export function insertIntoLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
}

export function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export async function obtenerAcronimoTipoDocumento(idTipoDocumento) {
  const { data } = await Axios.get(`${HOST}/app/tipoDocumento`, {
    params: { idTipoDocumento },
  });

  return data.response;
}

export function obtenerGenero(acronimoGenero) {
  switch (acronimoGenero) {
    case "M":
      return "MASCULINO";
    case "F":
      return "FEMENINO";
    case "O":
      return "OTRO";
    default:
      return "NA";
  }
}

export function getDepartamentos() {
  return Axios.get(`${HOST}/app/departamentos`)
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.error(error));
}

export function getDepartamentoByIdMunicipio(idMunicipio) {
  return Axios.get(`${HOST}/app/departamentos`, { params: { idMunicipio } })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.error(error));
}

export function getMunicipios(idDepartamento) {
  return Axios.get(`${HOST}/app/municipios`, { params: { idDepartamento } })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.error(error));
}

export function getMunicipioById(idMunicipio) {
  return Axios.get(`${HOST}/app/municipios`, { params: { idMunicipio } })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.error(error));
}

export function getInformacionEmprendedor(idUsuario) {
  return Axios.get(`${HOST}/emprendedor`, {
    params: {
      idUsuario,
    },
  })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.error(error));
}

export function obtenerNombreEtapa(idEtapa) {
  switch (idEtapa) {
    case T_SINAPSIS_ETAPAS_RUTA_SONAR:
      return T_SINAPSIS_ETAPAS_RUTA_SONAR_NOMBRE;

    case T_SINAPSIS_ETAPAS_RUTA_PENSAR:
      return T_SINAPSIS_ETAPAS_RUTA_PENSAR_NOMBRE;

    case T_SINAPSIS_ETAPAS_RUTA_TESTEAR:
      return T_SINAPSIS_ETAPAS_RUTA_TESTEAR_NOMBRE;

    case T_SINAPSIS_ETAPAS_RUTA_ARRANCAR:
      return T_SINAPSIS_ETAPAS_RUTA_ARRANCAR_NOMBRE;

    default:
      return "N/A";
  }
}

export function obtenerNombreRol(idRol) {
  switch (idRol) {
    case SINAPSIS_APP_ADM_ROLE_ID:
      return SINAPSIS_APP_ADM_ROLE_NAME;

    case SINAPSIS_APP_MNT_ROLE_ID:
      return SINAPSIS_APP_MNT_ROLE_NAME;

    case SINAPSIS_APP_EMP_ROLE_ID:
      return SINAPSIS_APP_EMP_ROLE_NAME;

    default:
      return "N/A";
  }
}

export function obtenerDiaSemana(nombreDia) {
  switch (nombreDia) {
    case SINAPSIS_APP_DIA_SEMANA_LUNES:
      return 1;

    case SINAPSIS_APP_DIA_SEMANA_MARTES:
      return 2;

    case SINAPSIS_APP_DIA_SEMANA_MIERCOLES:
      return 3;

    case SINAPSIS_APP_DIA_SEMANA_JUEVES:
      return 4;

    case SINAPSIS_APP_DIA_SEMANA_VIERNES:
      return 5;

    case SINAPSIS_APP_DIA_SEMANA_SABADO:
      return 6;

    default:
      return "N/A";
  }
}

export function getRandomRGBColor() {
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

  return randomRGB;
}

export function removeDuplicatesItems(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
