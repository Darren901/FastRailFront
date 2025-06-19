export const AlertModal = {
  showToast(icon, message) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: icon,
      title: message || "發生錯誤",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  },
};
