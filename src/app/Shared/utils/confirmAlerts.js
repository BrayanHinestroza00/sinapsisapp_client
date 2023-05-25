import Swal from "sweetalert2";

export const confirmAlert = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
}) => {
  Swal.fire({
    title: title,
    icon: "question",
    iconColor: "#9a66a8",
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#9a66a8",
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: cancelButtonText,
  }).then((res) => {
    if (res.isConfirmed) {
      onConfirm();
    }
  });
};

export const confirmAlertWithText = ({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
}) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "question",
    iconColor: "#9a66a8",
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#9a66a8",
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: cancelButtonText,
  }).then((res) => {
    if (res.isConfirmed) {
      onConfirm();
    }
  });
};
