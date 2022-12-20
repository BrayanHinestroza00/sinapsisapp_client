import { useEffect, useState } from "react";
import Axios from "axios";
import { HOST } from "src/utils/constants";

export function useAPI_GET(PATH, options) {
  const [loadingAPI, setLoading] = useState(true);
  const [dataAPI, setData] = useState(null);
  const [errorAPI, setError] = useState(null);

  useEffect(() => {
    Axios.get(`${HOST}${PATH}`, options)
      .then(({ data }) => {
        if (data.code == 1) {
          setData(data?.response);
          setError(data?.message);
        }

        if (data.code == -1) {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }, []);

  return [loadingAPI, dataAPI, errorAPI];
}

export function useAPI_POST(URL, options) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get(URL, options)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }, []);

  return [loading, data, error];
}

export function useAPI_PUT(URL, options) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get(URL, options)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  }, []);

  return [loading, data, error];
}

export function useAPI_DELETE(URL, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.delete(URL, options)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return [data, error];
}
