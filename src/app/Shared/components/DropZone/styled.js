/**Styles */
export const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "5px",
  borderWidth: 5,
  borderRadius: 6,
  borderColor: "#fcfcfc",
  borderStyle: "solid",
  backgroundColor: "#fff",
  outline: "none",
  transition: "border .24s ease-in-out",
  boxShadow: "rgba(0, 0, 0, 0.16) -1px 0px 6px 0px",
  height: "100px",
  fontFamily: "Roboto",
  fontSize: "28px",
  color: "rgb(51 51 51 / 75%)",
  marginTop: "15px",
  textAlign: "center",
};

export const activeStyle = {
  borderColor: "#2196f3",
};

export const acceptStyle = {
  borderColor: "#00e676",
};

export const rejectStyle = {
  borderColor: "#ff1744",
};

/**Vista previa */

export const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

export const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

export const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

export const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
