import axios from "axios";
import React, { useEffect, useState } from "react";
import { HOST } from "./Shared/utils/apiConstants";

function TestComponent() {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    axios
      .get(`${HOST}/app/download?idArchivo=5`)
      .then(({ data }) => {
        setDatos(data.response);
        console.log("TestComponent", data.response);
        console.log(
          "TestComponent",
          `data:image/png;base64,${data.response.file}`
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <></>;
  } else {
    return (
      <>
        <img src={`data:image/png;base64,${datos.file}`} alt={datos.filename} />
        <br />
        <br />
        <br />
        <a
          href={`data:${datos.contentType};base64,${datos.file}`}
          download={`${datos.filename}`}
        >
          Link
        </a>
      </>
    );
  }
}

export default TestComponent;
