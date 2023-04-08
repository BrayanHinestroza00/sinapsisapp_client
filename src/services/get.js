import Axios from "axios";
import { HOST } from "src/utils/apiConstants";

// PERFORM GET REQUESTS
export function simpleRequest(path, responseHandler) {
  let url = HOST + path;

  Axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(({ data }) => {
      if (data.code == 0) {
        return responseHandler("success", data.response);
      }

      if (data.code == 1) {
        return responseHandler("success", data.message);
      }

      if (data.code == -1) {
        return responseHandler("error", data.message);
      }
    })
    .catch((error) => responseHandler("error", error));
}
