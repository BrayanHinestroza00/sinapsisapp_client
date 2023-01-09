import MentorSidebar from "../sidebar/MentorSidebar";

function MentorContentLayout({ children, sidebar }) {
  return (
    <div className="container-fluid" style={{ marginTop: "4rem" }}>
      <div className="row flex-nowrap">
        {sidebar ? (
          <>
            <MentorSidebar />
            <div className="col py-3" style={{ maginLeft: "16.6666666667%" }}>
              {children}
            </div>
          </>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
}

export default MentorContentLayout;
