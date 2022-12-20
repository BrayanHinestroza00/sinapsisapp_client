import { HOST } from "../utils/constants";

function handleErrors(response) {
  if (response.status >= 500) {
    throw Error(response.statusText);
  }
  return response;
}

// PERFORM POST/PUT REQUESTS
export function simpleRequest(path, type, data, responseHandler) {
  let url = HOST + path;

  fetch(url, {
    method: type,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      if (response.hasOwnProperty("error")) {
        return responseHandler("error", response.error);
      }

      return responseHandler("success", response);
    })
    .catch((error) => responseHandler("error", error));
}
