import Axios from "axios";
import {
  T_SINAPSIS_ETAPAS_RUTA_ARRANCAR,
  T_SINAPSIS_ETAPAS_RUTA_ARRANCAR_NOMBRE,
  T_SINAPSIS_ETAPAS_RUTA_PENSAR,
  T_SINAPSIS_ETAPAS_RUTA_PENSAR_NOMBRE,
  T_SINAPSIS_ETAPAS_RUTA_SONAR,
  T_SINAPSIS_ETAPAS_RUTA_SONAR_NOMBRE,
  T_SINAPSIS_ETAPAS_RUTA_TESTEAR,
  T_SINAPSIS_ETAPAS_RUTA_TESTEAR_NOMBRE,
} from "./constants";
import { HOST } from "src/utils/apiConstants";

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
    .catch((error) => console.log(error));
}

export function getDepartamentoByIdMunicipio(idMunicipio) {
  return Axios.get(`${HOST}/app/departamentos`, { params: { idMunicipio } })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.log(error));
}

export function getMunicipios(idDepartamento) {
  return Axios.get(`${HOST}/app/municipios`, { params: { idDepartamento } })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.log(error));
}

export function getMunicipioById(idMunicipio) {
  return Axios.get(`${HOST}/app/municipios`, { params: { idMunicipio } })
    .then(({ data }) => {
      return data.response;
    })
    .catch((error) => console.log(error));
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
    .catch((error) => console.log(error));
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
