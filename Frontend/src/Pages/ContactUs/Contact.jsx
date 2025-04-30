import React, { useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [faqOpen, setFaqOpen] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://menstore-backend.onrender.com/api/contact",
        formData
      );
      toast.success(response.data.message || "Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const faqs = [
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via email at info@menstore.com or call us at +91 123-4567-890.",
    },
    {
      question: "What are your business hours?",
      answer: "We are available Monday to Friday from 9:00 AM - 5:00 PM (IST).",
    },
    {
      question: "What are your shipping options?",
      answer: "We offer standard and express shipping. Delivery times vary based on location.",
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes, we offer free shipping on orders above ₹999.",
    },
  ];

  return (
    <div className={`p-10 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <ToastContainer />
      <h1 className="font-bold text-3xl text-center mb-10">Contact Us</h1>
      <div className="flex flex-col lg:flex-row mx-auto lg:w-3/4 items-stretch shadow-lg rounded-2xl overflow-hidden">
        <div className={`w-full lg:w-1/2 p-10 lg:py-36 flex flex-col justify-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-orange-500 text-white"}`}>
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p className="mb-5">Feel free to reach out to us. We are available during business hours to assist you.</p>
          <p className="mb-2"><strong>Email:</strong> info@menstore.com</p>
          <p className="mb-2"><strong>Phone:</strong> +91 123-4567-890</p>
          <p className="mb-2"><strong>Address:</strong> 123 Main Street, City, Country, ZIP</p>
          <p><strong>Business Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM (IST)</p>
        </div>

        <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"} w-full lg:w-1/2 p-10`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter your name" className="w-full mt-2 p-3 border rounded-lg text-black" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Enter your email" className="w-full mt-2 p-3 border rounded-lg text-black" value={formData.email} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Enter subject" className="w-full mt-2 p-3 border rounded-lg text-black" value={formData.subject} onChange={handleChange} required />
            <textarea name="message" placeholder="Enter your message..." className="w-full mt-2 p-3 border rounded-lg text-black" value={formData.message} onChange={handleChange} required rows="4"></textarea>
            <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300">Submit</button>
          </form>
        </div>
      </div>

      <div
        className={`mt-16 p-6 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg shadow-md`}
      >
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <button
              className="w-full text-left font-semibold text-lg"
              onClick={() => setFaqOpen(faqOpen === index ? null : index)}
            >
              {faq.question}
            </button>
            {faqOpen === index && <p className="mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>

      <div
        className={`mt-16 p-6 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } rounded-lg shadow-md`}
      >
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p>
          Your privacy is important to us. We do not share your personal
          information with third parties. All details submitted through this
          form are used solely for customer support and communication purposes.
        </p>
      </div>
    </div>
  );
};

export default Contact;
