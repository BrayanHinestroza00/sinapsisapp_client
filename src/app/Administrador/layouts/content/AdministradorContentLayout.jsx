import AdministradorSidebar from "../sidebar/AdministradorSidebar";

function AdministradorContentLayout({ children, sidebar }) {
  return (
    <div className="container-fluid" style={{ marginTop: "4rem" }}>
      <div className="row flex-wrap">
        {sidebar ? (
          <>
            <AdministradorSidebar />
            <div
              className="col-10 py-3"
              style={{
                backgroundColor: "#FFEDED",
                maginLeft: "16.6666666667%",
              }}
            >
              {children}
            </div>
          </>
        ) : (
          <div style={{ backgroundColor: "#FFEDED" }}>{children}</div>
        )}
      </div>
    </div>
  );
}

export default AdministradorContentLayout;
