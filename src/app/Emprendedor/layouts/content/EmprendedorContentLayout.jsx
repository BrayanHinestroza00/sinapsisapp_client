import EmprendedorSidebar from "../sidebar/EmprendedorSidebar";

function EmprendedorContentLayout({ children, sidebar }) {
  return (
    <div className="container-fluid" style={{ marginTop: "7.5rem" }}>
      <div className="row flex-wrap">
        {sidebar ? (
          <>
            <EmprendedorSidebar />
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

export default EmprendedorContentLayout;
