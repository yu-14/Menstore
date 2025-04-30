# **MenStore - E-Commerce Platform for Men's Fashion**  

**MenStore** is a **full-stack** e-commerce web application exclusively for men's fashion. It allows users to browse, add to cart, and place orders with both **COD (Cash on Delivery) and online payment (via Stripe)** options.  

## **🚀 Features**  

### **Frontend (React + Tailwind CSS)**  
- **User Authentication** (using Clerk in development mode)  
- **Product Listings** (Men’s clothing and accessories)  
- **Cart Functionality**  
- **Order Placement** (COD & Stripe Payment Integration)  
- **My Orders Page** (View past orders)  
- **Dark Mode Support** (via ThemeContext)  

### **Backend (Node.js + Express + MongoDB)**  
- **User Management** (Sign up & login)  
- **Orders API** (Stores order details in MongoDB)  
- **Contact Form Handling**  
- **Admin Panel (Planned)**  

## **🛠️ Tech Stack**  

| Frontend : React, Tailwind CSS, Vite 
| Backend : Node.js, Express.js 
| Database : MongoDB
| Authentication : Clerk (development mode) 
| Payments : Stripe 
| Deployment : Render

## **📂 Folder Structure**  

```
Menstore/
│── Backend/
│   ├── Config/ (Database connection)
│   ├── Controllers/ (Business logic)
│   ├── Models/ (Database models)
│   ├── Routes/ (API endpoints)
│   ├── server.js (Main backend file)
│   ├── .env (Environment variables)
│── Frontend/
│   ├── src/
│   │   ├── Components/ (UI components)
│   │   ├── Context/ (State management)
│   │   ├── Pages/ (App pages)
│   │   ├── App.jsx (Main App)
│   │   ├── main.jsx (Entry point)
│   ├── public/
│   ├── .env (Frontend environment variables)
│── README.md
│── package.json
```

## **💻 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/saiganesh1976/Menstore.git
cd Menstore
```

### **2️⃣ Backend Setup**  
```bash
cd Backend
npm install
```
- Add a `.env` file and set up MongoDB, Stripe keys, and other environment variables.  
- Run the server:  
  ```bash
  npm start
  ```

### **3️⃣ Frontend Setup**  
```bash
cd ../Frontend
npm install
npm run dev
```
Your frontend should be running at `http://localhost:5173`.

## **📌 Future Enhancements**  
- ✅ Admin Panel for product & order management  
- ✅ Enhanced search & filtering  
- ✅ Wishlist feature  

## **📬 Contact**  
For any questions or contributions, feel free to reach out! 🚀  

---

Let me know if you need modifications! 😊
