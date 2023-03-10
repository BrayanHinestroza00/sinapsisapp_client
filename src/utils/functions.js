import Axios from "axios";
import { useFetch } from "src/services/hooks/useFetch";
import {
  HTTP_METHOD_GET,
  URL_OBTENER_PROGRAMAS_ACADEMICOS,
} from "./apiConstants";
import { HOST } from "./constants";

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
      break;

    case "F":
      return "FEMENINO";
      break;

    case "O":
      return "OTRO";
      break;
    default:
      return "NA";
      break;
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
