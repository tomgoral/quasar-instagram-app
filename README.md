# 📸 Quasar Instagram App

An Instagram-like social media application built with **Quasar (Vue.js)** frontend and **Express.js** backend, featuring camera functionality, post creation, and real-time updates.

![Live Demo](https://img.shields.io/badge/Live%20Demo-https%3A//tomgoral.cloud-brightgreen)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Quasar](https://img.shields.io/badge/Quasar-1976D2?style=flat&logo=quasar&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)

## 🌟 Live Demo

**Frontend:** https://tomgoral.cloud  
**API:** https://tomgoral.cloud/api

## 🚀 Features

### Frontend (Quasar Vue.js)
- 📱 **Responsive Design** - Mobile-first responsive layout
- 📸 **Camera Integration** - Take photos or upload images
- 🎯 **Geolocation** - Automatic location detection for posts
- ⚡ **Real-time Updates** - Live post creation and viewing
- 🎨 **Modern UI** - Instagram-like interface with Quasar components
- 📍 **Location Services** - Reverse geocoding for city/country display

### Backend (Express.js)
- 🔌 **REST API** - Full CRUD operations for posts
- 🌐 **CORS Enabled** - Cross-origin resource sharing
- 📊 **JSON Responses** - Structured API responses
- 🛡️ **Error Handling** - Comprehensive error management
- ⚡ **Fast Performance** - Optimized Express.js server

### DevOps & Deployment
- 🔐 **HTTPS SSL** - Let's Encrypt certificate with auto-renewal
- 🚀 **Production Ready** - Nginx reverse proxy configuration
- 📦 **Docker Ready** - Containerization support
- 🔧 **Environment Config** - Development/production configurations
- 📋 **Comprehensive Documentation** - Complete deployment guide

## 🛠️ Tech Stack

### Frontend
- **Quasar Framework** - Vue.js based UI framework
- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Composition API** - Modern Vue.js development
- **Sass** - CSS preprocessor
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing middleware

### Infrastructure
- **Nginx** - Web server and reverse proxy
- **Let's Encrypt** - Free SSL certificates
- **Ubuntu Server** - Production hosting environment
- **PM2** - Process management (optional)

## 📁 Project Structure

```
quasar-instagram-app/
├── 📱 Frontend (Quasar SPA)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── PageHome.vue     # Main feed with posts
│   │   │   └── PageCamera.vue   # Photo capture & post creation
│   │   ├── services/
│   │   │   └── apiService.js    # API communication layer
│   │   ├── config/
│   │   │   └── api.js           # Environment-based API config
│   │   └── layouts/
│   │       └── MainLayout.vue   # App layout with navigation
│   └── dist/spa/                # Built frontend files
│
├── 🔧 Backend (Express.js API)
│   ├── index.js                 # Main server file
│   ├── package.json            # Dependencies
│   └── .env                    # Environment variables
│
└── 📋 Documentation
    ├── DEPLOYMENT.md           # Complete deployment guide
    └── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tomgoral/quasar-instagram-app.git
   cd quasar-instagram-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Frontend (http://localhost:9000)
   npm run dev
   
   # Terminal 2 - Backend (http://localhost:3000)
   cd backend
   npm run dev
   ```

## 📱 Usage

### Creating Posts
1. Navigate to the **Camera** tab
2. Take a photo or upload an image
3. Add a caption and location
4. Tap **Post Image** to share

### Viewing Posts
- Home feed displays all posts in chronological order
- Each post shows caption, location, and timestamp
- Responsive design works on mobile and desktop

## 🌍 Production Deployment

The app is deployed with enterprise-grade infrastructure:

- **HTTPS**: SSL certificate with auto-renewal
- **CDN**: Optimized static asset delivery  
- **Reverse Proxy**: Nginx handling requests
- **API Gateway**: Backend API proxied through `/api`

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

## 🔧 Environment Configuration

### Development
```bash
# .env.development
NODE_ENV=development
VITE_API_URL=http://localhost:3000
```

### Production  
```bash
# .env.production
NODE_ENV=production
VITE_API_URL=https://tomgoral.cloud/api
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/posts` | Get all posts |
| POST | `/posts` | Create new post |

### Example API Response
```json
{
  "id": 1,
  "caption": "Beautiful sunset!",
  "location": "San Francisco, CA",
  "date": 1708012800000
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Tom Goral**
- Website: [tomgoral.cloud](https://tomgoral.cloud)
- GitHub: [@tomgoral](https://github.com/tomgoral)
- Email: tg@tomgoral.com

## 🙏 Acknowledgments

- [Quasar Framework](https://quasar.dev) - Amazing Vue.js framework
- [Express.js](https://expressjs.com) - Fast web framework for Node.js
- [Let's Encrypt](https://letsencrypt.org) - Free SSL certificates
- [Vue.js](https://vuejs.org) - The progressive JavaScript framework

---

⭐ **Star this repository if you found it helpful!**
