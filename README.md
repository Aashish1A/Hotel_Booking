# 🏨 StayFinder - Hotel Booking Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
</div>

<div align="center">
  <h3>✨ A modern full-stack hotel booking application with secure payments and beautiful UI ✨</h3>
  <p>
    <a href="https://stayfinder-roan.vercel.app" target="_blank">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

---

## 📖 About The Project

StayFinder is a comprehensive hotel booking platform that connects travelers with their perfect accommodation. Built with modern web technologies, it offers a seamless booking experience with real-time availability, secure authentication, and integrated payment processing.

**Key Highlights:**
- 🎨 Beautiful, responsive UI built with React and Tailwind CSS
- 🔐 Secure authentication via Clerk (email, Google, GitHub)
- 💳 Integrated Stripe payment gateway
- 📧 Automated email confirmations with Nodemailer
- 🏢 Dual-interface: Customer bookings + Hotel owner dashboard
- ☁️ Cloud-based image management with Cloudinary

---

## ✨ Features

### For Travelers
- Browse and search hotels by destination, dates, and guests
- Filter by price range, room type, and amenities
- View detailed room information with image galleries
- Secure booking with Stripe payment integration
- Email confirmations for bookings
- Manage booking history

### For Hotel Owners
- Dedicated dashboard to manage properties
- Add and list rooms with descriptions and images
- Track bookings and revenue analytics
- Manage room availability and pricing

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Clerk** - Authentication

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting
- **Nodemailer** - Email service

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Clerk account
- Stripe account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aashish1A/Hotel_Booking.git
   cd Hotel_Booking
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd Server
   npm install

   # Install client dependencies
   cd ../Client
   npm install
   ```

3. **Environment Variables**

   Create `.env` file in the `Server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

   Create `.env` file in the `Client` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. **Run the application**
   ```bash
   # Run server (from Server directory)
   npm run dev

   # Run client (from Client directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:4000`

---

## 📁 Project Structure

```
Hotel_Booking/
├── Client/              # React frontend
│   ├── src/
│   │   ├── Components/  # Reusable components
│   │   ├── Pages/       # Page components
│   │   ├── context/     # React context
│   │   └── assets/      # Static assets
│   └── package.json
│
└── Server/              # Node.js backend
    ├── controllers/     # Route controllers
    ├── models/          # MongoDB models
    ├── routes/          # API routes
    ├── configs/         # Configuration files
    └── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📧 Contact

**Aashish Kumar**
- GitHub: [@Aashish1A](https://github.com/Aashish1A)
- Project Link: [https://github.com/Aashish1A/Hotel_Booking](https://github.com/Aashish1A/Hotel_Booking)

---

## 📄 License

This project is open source and available under the MIT License.

---

<div align="center">
  <p>Made with ❤️ by Aashish Kumar</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>