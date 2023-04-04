import EmprendedorSidebar from "../sidebar/EmprendedorSidebar";

function EmprendedorContentLayout({ children, sidebar }) {
  // const margin = sidebar ? { marginTop: "2.5rem" } : { marginTop: "8rem" };
  return (
    // <div className="container-fluid" style={margin}>
    <div className="container-fluid" style={{ marginTop: "8rem" }}>
      <div className="row flex-nowrap">
        {sidebar ? (
          <>
            <EmprendedorSidebar />
            <div
              className="col py-3"
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
