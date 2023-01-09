import React from "react";
import MentorLayout from "src/layouts/MentorLayout";

import imagen from "../../assets/images/home/315222325_3267776200103231_4392146787720809758_n.jpg";

function HomePage() {
  return (
    <MentorLayout sidebar={true}>
      <>
        <h1>Últimos anuncios</h1>
        <div className="container">
          <p>
            Fecha de publicación:{" "}
            <span className="text-muted">21 de noviembre a las 11:39</span>
          </p>
          <p>
            La Gran Vitrina Verde, se llevará a cabo el 25 de noviembre en el
            Bulevar del Río Cali, evento de región que tendrá productos y
            servicios de 100 negocios verdes. 📣♻️
          </p>
          <div className="w-100 text-center">
            <img
              src={imagen}
              alt="evento"
              className="rounded"
              style={{ maxWidth: "50vw" }}
            />
          </div>
        </div>
      </>
    </MentorLayout>
  );
}

export default HomePage;
