import { useEffect, useState } from "react";
import {
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_DELETE,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET,
  SINAPSIS_APP_LOCALSTORAGE_OPERACION_INSERT,
} from "src/utils/constants";

export function useLocalStorage(operacion, key, value) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    switch (operacion) {
      case SINAPSIS_APP_LOCALSTORAGE_OPERACION_GET:
        getFromLocalStorage(key);
        break;
      case SINAPSIS_APP_LOCALSTORAGE_OPERACION_INSERT:
        insertIntoLocalStorage(key, value);
        break;

      case SINAPSIS_APP_LOCALSTORAGE_OPERACION_DELETE:
        deleteFromLocalStorage(key);
        break;

      default:
        break;
    }
  }, [operacion]);

  const insertIntoLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setLoading(false);
  };

  const getFromLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    if (item) {
      setData(JSON.parse(item));
    } else {
      return null;
    }
    setLoading(false);
  };

  const deleteFromLocalStorage = (key) => {
    localStorage.removeItem(key);
    setLoading(false);
  };

  return { data, loading };
}
