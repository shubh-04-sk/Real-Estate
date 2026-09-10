import ContactForm from "./ContactForm";

function ContactModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-90">
        <ContactForm onClose={onClose} />
      </div>
    </div>
  );
}

export default ContactModal;
