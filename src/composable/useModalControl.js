import { onMounted, ref } from "vue";
import Modal from "bootstrap/js/dist/modal";

export const useModal = () => {
  let modal;
  const modalRef = ref(null);

  const showModal = () => {
    modal.show();
  };

  const hideModal = () => {
    modal.hide();
  };

  onMounted(() => {
    modal = new Modal(modalRef.value);
  });

  return {
    modalRef,
    showModal,
    hideModal,
  };
};
