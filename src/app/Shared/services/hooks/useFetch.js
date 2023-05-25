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
      }
    } catch (err) {
      if (err.code == "ERR_NETWORK") {
        setError(ERR_MESSAGE_CODE_NOT_NETWORK);
      } else if (err.hasOwnProperty("response")) {
        setError(err.response.data.message);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, message, error, loading, fetchAPI };
}
