# 🏨 Hotel Booking System

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
</div>

<div align="center">
  <h3>🌟 A modern, full-stack hotel booking platform with real-time availability, secure authentication, and beautiful UI 🌟</h3>
</div>

---

## 📸 Preview

> **🚀 Live Demo:** [StayFinder - Hotel Booking System](https://stayfinder-roan.vercel.app)

<div align="center">
  <a href="https://stayfinder-roan.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_StayFinder-blue?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</div>

---

## ✨ Features

### 🧑‍💼 **For Customers**

- 🔐 **Secure Authentication** - Powered by Clerk with social login
- 🏨 **Browse Hotels** - Search and filter hotels by location, price, amenities
- 📅 **Real-time Availability** - Check room availability for specific dates
- 💳 **Easy Booking** - Seamless booking process with instant confirmation
- 📧 **Email Confirmations** - Automated booking confirmations via email
- 📱 **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- 🔍 **Booking History** - Track all your past and upcoming reservations

### 🏢 **For Hotel Owners**

- 🏨 **Hotel Registration** - One-time hotel setup with detailed information
- 🛏️ **Room Management** - Add, edit, and manage room inventory
- 📊 **Analytics Dashboard** - View booking analytics, revenue, and occupancy
- 🎯 **Booking Management** - Track customer bookings and guest information
- 💰 **Revenue Tracking** - Monitor total earnings and booking trends
- 🔧 **Room Availability** - Toggle room availability in real-time

### 🚀 **System Features**

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🛡️ **Duplicate Prevention** - Smart logic prevents double bookings
- 🌐 **RESTful API** - Well-documented backend with proper error handling
- 📱 **Mobile First** - Responsive design for all screen sizes
- 🔒 **Secure** - Protected routes and data validation
- 📧 **Email Integration** - Automated notifications via Brevo SMTP
- 💳 **Payment Processing** - Secure transactions with Stripe integration

---

## 🛠️ Tech Stack

### **Frontend**

| Technology          | Description                              |
| ------------------- | ---------------------------------------- |
| **React 18**        | Modern UI library with hooks and context |
| **Vite**            | Lightning-fast build tool and dev server |
| **Tailwind CSS**    | Utility-first CSS framework              |
| **React Router**    | Client-side routing and navigation       |
| **Axios**           | HTTP client for API requests             |
| **React Hot Toast** | Beautiful toast notifications            |

### **Backend**

| Technology     | Description                                |
| -------------- | ------------------------------------------ |
| **Node.js**    | JavaScript runtime environment             |
| **Express.js** | Fast, unopinionated web framework          |
| **MongoDB**    | NoSQL database with Mongoose ODM           |
| **Clerk**      | Complete authentication solution           |
| **Cloudinary** | Cloud-based image storage and optimization |
| **Nodemailer** | Email sending with Brevo SMTP              |
| **Stripe**     | Secure payment processing and webhooks     |

### **Database Schema**

- **Users** - Authentication and profile management
- **Hotels** - Hotel information and ownership
- **Rooms** - Room details, pricing, and availability
- **Bookings** - Reservation data with date validation

---

## 🚀 Getting Started

### **Prerequisites**

- 📦 Node.js (v16 or higher)
- 🗄️ MongoDB Atlas account (or local MongoDB)
- 🔐 Clerk account for authentication
- ☁️ Cloudinary account for image storage
- 📧 Brevo account for email service

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/Aashish1A/Hotel_Booking.git
   cd Hotel_Booking
   ```

2. **Install Backend Dependencies**

   ```bash
   cd Server
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../Client
   npm install
   ```

4. **Environment Variables**

   Create a `.env` file in the `Server` directory:

   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-booking
   PORT=3000

   # Authentication (Clerk)
   CLERK_PUBLISHABLE_KEY=pk_test_xxx
   CLERK_SECRET_KEY=sk_test_xxx
   CLERK_WEBHOOK_SECRET=whsec_xxx

   # Image Storage (Cloudinary)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email Service (Brevo)
   SENDER_EMAIL=your-email@gmail.com
   SMTP_USER=your-smtp-user
   SMTP_PASS=your-smtp-password
   ```

   Create a `.env` file in the `Client` directory:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
   VITE_BACKEND_URL=http://localhost:3000
   ```

5. **Start the Development Servers**

   Backend:

   ```bash
   cd Server
   npm start
   ```

   Frontend (in a new terminal):

   ```bash
   cd Client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

---

## 📂 Project Structure

```
Hotel_Booking/
├── 📁 Client/                    # Frontend React application
│   ├── 📁 src/
│   │   ├── 📁 Components/        # Reusable UI components
│   │   ├── 📁 Pages/            # Main application pages
│   │   ├── 📁 context/          # React context for state management
│   │   ├── 📁 assets/           # Images, icons, and static files
│   │   └── 📄 main.jsx          # Application entry point
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
│
├── 📁 Server/                    # Backend Node.js application
│   ├── 📁 controllers/          # Business logic and route handlers
│   ├── 📁 models/              # MongoDB schemas and models
│   ├── 📁 routes/              # API route definitions
│   ├── 📁 middleware/          # Authentication and upload middleware
│   ├── 📁 configs/             # Database and service configurations
│   ├── 📄 server.js            # Server entry point
│   └── 📄 package.json
│
├── 📄 README.md
└── 📄 vercel.json              # Deployment configuration
```

---

## 🔌 API Endpoints

### **Authentication**

```http
POST /api/webhooks/clerk          # Clerk webhook for user sync
```

### **Hotels**

```http
POST /api/hotels/register         # Register a new hotel
GET  /api/hotels/owner           # Get hotels by owner
```

### **Rooms**

```http
POST /api/rooms/add              # Add a new room
GET  /api/rooms/hotel/:id        # Get rooms by hotel
GET  /api/rooms/all              # Get all available rooms
```

### **Bookings**

```http
POST /api/bookings/check-availability  # Check room availability
POST /api/bookings/book               # Create a new booking
GET  /api/bookings/user              # Get user's bookings
GET  /api/bookings/hotel             # Get hotel's bookings (owner)
```

---

## 🎨 Key Features Implementation

### **🔐 Authentication Flow**

```javascript
// Clerk integration with webhook sync
export const clerkWebHooks = async (req, res) => {
  const { type, data } = req.body;

  if (type === "user.created") {
    await User.create({
      _id: data.id,
      userName: data.username,
      email: data.email_addresses[0].email_address,
    });
  }
};
```

### **📅 Availability Checking**

```javascript
// Smart date overlap detection
const checkRoomAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
  userId,
}) => {
  const overlappingBookings = await Booking.find({
    room,
    $or: [
      {
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
      },
    ],
  });

  // Prevent duplicate bookings by same user
  if (userId) {
    const userBooking = overlappingBookings.find(
      (booking) => booking.user.toString() === userId.toString()
    );
    if (userBooking) {
      return {
        isAvailable: false,
        message: "You already have a booking for this room",
      };
    }
  }

  return { isAvailable: overlappingBookings.length === 0 };
};
```

### **📧 Email Notifications**

```javascript
// Automated booking confirmations
const mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: req.user.email,
  subject: "Booking Confirmation",
  html: `
    <h2>Your Booking Details</h2>
    <p>Dear ${req.user.userName},</p>
    <p>Your booking has been confirmed!</p>
    <!-- Beautiful HTML template with booking details -->
  `,
};
await transporter.sendMail(mailOptions);
```

---

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Deploy Backend:**

   ```bash
   cd Server
   vercel --prod
   ```

2. **Deploy Frontend:**

   ```bash
   cd Client
   npm run build
   vercel --prod
   ```

3. **Environment Variables:**
   Add all environment variables in Vercel dashboard under Settings > Environment Variables

### **Alternative: Railway, Heroku, or DigitalOcean**

The application is deployment-ready for any Node.js hosting platform.

---

## 🔮 Future Enhancements

- 💳 **Payment Integration** - Stripe/Razorpay for secure payments
- 🗺️ **Maps Integration** - Google Maps for hotel locations
- ⭐ **Review System** - Customer reviews and ratings
- 🔔 **Push Notifications** - Real-time booking updates
- 📱 **Mobile App** - React Native mobile application
- 🤖 **AI Chatbot** - Customer support automation
- 📈 **Advanced Analytics** - Detailed business insights
- 🌍 **Multi-language** - Internationalization support

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aashish Kumar**

- 🐙 GitHub: [@Aashish1A](https://github.com/Aashish1A)
- 📧 Email: aashishkumarroy86@gmail.com
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/aashish-kumar)

---

## 🙏 Acknowledgments

- 🎨 **Design Inspiration** - Modern hotel booking platforms
- 📚 **Documentation** - React, Node.js, and MongoDB communities
- 🔧 **Tools** - Clerk for authentication, Cloudinary for images
- 📧 **Email Service** - Brevo for reliable email delivery

---

<div align="center">
  <h3>⭐ If you found this project helpful, please consider giving it a star! ⭐</h3>
  <p>Made with ❤️ for the development community</p>
</div>
