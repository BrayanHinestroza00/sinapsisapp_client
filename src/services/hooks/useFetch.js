import { useEffect, useState } from "react";
import axios from "axios";
import {
  CODE_ERR,
  CODE_NO_CHANGES,
  CODE_OK,
  ERR_MESSAGE_CODE_NOT_VALID,
} from "src/utils/apiConstants";

export function useFetch({ URL, requestOptions }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setData(null);
        setError(null);

        const { data } = await axios({
          url: URL,
          ...requestOptions,
        });

        switch (data.code) {
          case CODE_OK:
            setData(data.response);
            break;
          case CODE_NO_CHANGES:
            setError(data.message);
            break;
          case CODE_ERR:
            setError(data.message);
            break;
          default:
            setError(ERR_MESSAGE_CODE_NOT_VALID);
            break;
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [URL]);

  return { data, error, loading };
}
