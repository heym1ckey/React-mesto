export default function handleOverlayClick(e, onclose) {
  if (e.target === e.currentTarget) {
    onclose();
  }
}
