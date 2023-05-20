import { useCallback, useState } from "react";
import axios from "axios";
import {
  CODE_ERR,
  CODE_NO_CHANGES,
  CODE_OK,
  ERR_MESSAGE_CODE_NOT_NETWORK,
  ERR_MESSAGE_CODE_NOT_VALID,
} from "src/app/Shared/utils/apiConstants";

export function useFetch() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAPI = useCallback(async ({ URL, requestOptions }) => {
    try {
      setLoading(true);
      setData(null);
      setError(null);
      setMessage(null);

      const responseAPI = await axios({
        url: URL,
        ...requestOptions,
      });

      if (responseAPI.data.hasOwnProperty("code")) {
        switch (responseAPI.data.code) {
          case CODE_OK:
            setData(responseAPI.data.response);
            break;
          case CODE_NO_CHANGES:
            setMessage(responseAPI.data.message);
            setData(responseAPI.data.response);
            break;
          case CODE_ERR:
            setError(responseAPI.data.message);
            break;
          default:
            setError(ERR_MESSAGE_CODE_NOT_VALID);
            break;
        }
      } else {
        // Es un reporte por lo tanto, se debe descargar el archivo.
        if (responseAPI.data.type == "attachment") {
          const documentName =
            responseAPI.headers["content-type"].split("=")[1];
          setData(responseAPI.data);
          setMessage(documentName);
        } else {
          const response = await new Response(responseAPI.data).text();
          const { message } = await JSON.parse(response);
          setMessage(message);
        }
      }
    } catch (err) {
      if (err.code == "ERR_NETWORK") {
        setError(ERR_MESSAGE_CODE_NOT_NETWORK);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, message, error, loading, fetchAPI };
}
