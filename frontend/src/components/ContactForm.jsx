import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactForm({ onClose }) {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    //  digits only
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateName = () => {
    const name = formData.name.trim();

    if (!name) {
      setErrors({ name: "Name is required." });
      return false;
    }

    if (name.length < 4) {
      setErrors({
        name: "Name must be at least 4 characters.",
      });
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,12}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must contain 10 to 12 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateName()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStepTwo()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  return (
    <div className="relative w-full max-w-90 rounded-lg border border-black bg-[#202020] px-6 py-7 text-white shadow-xl">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-3 flex h-4 w-4 items-center justify-center rounded-full border border-gray-500 text-[10px] text-gray-400 transition hover:border-white hover:text-white"
        >
          ×
        </button>
      )}

      {/* 1 */}
      {step === 1 && (
        <>
          <ContactHeader />

          <div className="mt-9">
            <label className="mb-2 block text-[10px]">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded border border-gray-500 bg-transparent px-3 py-2.5 text-[10px] outline-none placeholder:text-gray-500 "
            />

            {errors.name && (
              <p className="mt-1 text-[10px] text-red-400">{errors.name}</p>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={formData.name.trim().length < 4}
              className="mt-6 w-full rounded border border-gray-400 bg-black py-2 text-[10px] transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-black disabled:hover:text-white"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/*  2 */}
      {step === 2 && (
        <>
          <ContactHeader />

          <form onSubmit={handleSubmit} className="mt-9">
            <label className="mb-2 block text-[10px]">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email id"
              className="w-full rounded border border-gray-500 bg-transparent px-3 py-2.5 text-[10px] outline-none placeholder:text-gray-500 "
            />

            {errors.email && (
              <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>
            )}

            <label className="mb-2 mt-5 block text-[10px]">Phone Number</label>

            <div className="flex">
              <div className="flex items-center gap-1 rounded-l border border-r-0 border-gray-500 px-2 text-[10px] text-gray-400">
                <span>🇮🇳</span>
                <span>+91</span>
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={12}
                placeholder="Enter your Phone Number"
                className="min-w-0 flex-1 rounded-r border border-gray-500 bg-transparent px-3 py-2.5 text-[10px] outline-none placeholder:text-gray-500 "
              />
            </div>

            {errors.phone && (
              <p className="mt-1 text-[10px] text-red-400">{errors.phone}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/2 rounded border border-gray-500 py-2 text-[10px] text-gray-400 transition hover:border-white hover:text-white"
              >
                Back
              </button>

              <button
                type="submit"
                className="w-1/2 rounded border border-gray-400 bg-black py-2 text-[10px] transition hover:bg-white hover:text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}

      {/*  last */}
      {step === 3 && (
        <div className="py-4">
          <p className="text-center text-[7px] tracking-[3px]">
            THANK YOU FOR CONNECTING!
          </p>

          <h1 className="mt-5 text-center text-xl font-normal leading-7">
            We appreciate your interest
            <br />
            and will be in touch soon
          </h1>

          <p className="mt-5 text-center text-[10px] leading-5 text-gray-300">
            In the meantime, feel free to browse our website
            <br />
            to learn more about our offerings.
          </p>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-[10px] transition hover:underline"
            >
              Explore more
              <span className="ml-2 text-sm">›</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactHeader() {
  return (
    <>
      <p className="text-center text-[7px] tracking-[3px]">CONTACT US</p>

      <h1 className="mt-3 text-center text-xl font-normal">
        Get In Touch With Us
      </h1>

      <p className="mt-2 text-center text-[10px] leading-5 text-gray-300">
        Get free consultation with a professional real
        <br />
        estate consultant.
      </p>
    </>
  );
}

export default ContactForm;
