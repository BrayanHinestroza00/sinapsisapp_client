import MentorSidebar from "../sidebar/MentorSidebar";

function MentorContentLayout({ children, sidebar }) {
  return (
    <div className="container-fluid p-0">
      <div className="row flex-wrap">
        {sidebar ? (
          <>
            <MentorSidebar />
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

export default MentorContentLayout;
