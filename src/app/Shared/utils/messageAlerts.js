import Swal from "sweetalert2";

export const messageAlert = ({
  title,
  text,
  icon,
  confirmButtonText,
  onConfirm,
}) => {
  Swal.fire({
    title: title,
    html: text,
    icon: icon,
    iconColor: "#9a66a8",
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#9a66a8",
    showConfirmButton: true,
  }).then(() => {
    if (onConfirm) {
      onConfirm();
    }
  });
};

export const messageAlertWithoutText = ({
  title,
  icon,
  confirmButtonText,
  onConfirm,
}) => {
  Swal.fire({
    title: title,
    icon: icon,
    iconColor: "#9a66a8",
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#9a66a8",
    showConfirmButton: true,
  }).then(() => {
    if (onConfirm) {
      onConfirm();
    }
  });
};
