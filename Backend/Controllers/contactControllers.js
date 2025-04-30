import Contact from "../Models/contactModel.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const token = Math.floor(Math.random() * 10000);

    const newContact = new Contact({ name, email, subject, message, token });
    await newContact.save();

    res.status(201).json({ message: `Your token #${token} has been received!` });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all contact form submissions (for admin use)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Server error" });
  }
};
