import PopupWithForm from "./PopupWithForm";

export default function Confirmation({ isOpen, onConfirm, onClose }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    return onConfirm();
  };
  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены ?"
      buttonTitle="Да"
      loadingButtonTitle="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
