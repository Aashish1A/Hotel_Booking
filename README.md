# Hotel Booking App

A full-stack hotel booking platform built with React, Vite, Tailwind CSS, and Node.js.

## Features

- User authentication (Clerk)
- Browse and search hotels
- Book rooms with real-time availability
- Hotel owner dashboard to add/list rooms
- Responsive design (mobile & desktop)
- User dashboard for managing bookings

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** Clerk
- **Other:** Cloudinary (for images), Axios

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database (local or Atlas)
- Clerk account (for authentication)

### Installation




#### 2. Install dependencies

npm i express dotenv cors mongoose cloudinary multer svix

#### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URI=your_mongodb_uri
CLOUDINARY_URL=your_cloudinary_url
CLERK_API_KEY=your_clerk_api_key
CLERK_FRONTEND_API=your_clerk_frontend_api
```