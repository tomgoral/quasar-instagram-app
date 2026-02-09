# Frontend & Backend Deployment Guide for Hostinger

## Quick Setup Steps

### 1. Update Production API URL
Before deploying, update your production API URL:

1. Edit `.env.production` file
2. Replace `https://your-domain.com` with your actual Hostinger domain
3. Example: `VITE_API_URL=https://api.yourdomain.com`

### 2. Backend Deployment

**For Node.js Hosting Plans:**
1. Login to Hostinger control panel
2. Go to **Advanced** → **Node.js Apps** 
3. Create new application
4. Upload these backend files:
   - `index.js`
   - `package.json`
   - `.env.example` (rename to `.env`)

**For Shared Hosting:**
1. Upload backend files to `public_html/api/` folder
2. Ensure Node.js is enabled in control panel
3. Set startup file to `index.js`

### 3. Frontend Deployment

**Build for production:**
```bash
npm run build
# or
quasar build
```

**Upload files:**
1. Upload contents of `dist/spa/` folder to `public_html/` 
2. Your domain should now serve the frontend
3. API calls will automatically use production URL

### 4. Testing Your Deployment

**Backend API Test:**
- Visit: `https://yourdomain.com/api/` (should show server status)
- Visit: `https://yourdomain.com/api/posts` (should return posts JSON)

**Frontend Test:**
- Visit: `https://yourdomain.com` (should load your app)
- Check browser console for any API errors

## Environment Configuration

### Development (Local)
- Frontend: `http://localhost:9000` (Quasar dev server)
- Backend: `http://localhost:3000` (Express server)
- API calls: `http://localhost:3000/posts`

### Production (Hostinger) 
- Frontend: `https://yourdomain.com`
- Backend: `https://yourdomain.com/api/`
- API calls: `https://yourdomain.com/api/posts`

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure:
1. Backend has `cors` package installed
2. Frontend domain is allowed in CORS settings

### API Connection Failed
1. Check if backend is running: `https://yourdomain.com/api/`
2. Verify API URL in `.env.production` matches your domain
3. Check browser network tab for actual API calls

### Build Issues
If build fails:
```bash
npm install
npm run build
```

## File Structure After Deployment

```
Hostinger File Manager:
├── public_html/
│   ├── index.html (frontend)
│   ├── css/
│   ├── js/
│   └── api/
│       ├── index.js (backend)
│       ├── package.json
│       └── .env
```

## Next Steps

1. Set up SSL certificate in Hostinger panel
2. Configure custom domain if needed
3. Add database for persistent post storage
4. Implement image upload functionality
5. Add authentication/user management

## Support Commands

**Test backend locally:**
```bash
cd backend && npm start
```

**Test frontend locally:**
```bash
quasar dev
```

**Build for production:**
```bash
quasar build
```