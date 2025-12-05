# Deployment Guide

## 🔒 Security Considerations

Before deploying to production, ensure you have implemented these security measures:

- **Authentication**: Consider implementing JWT authentication for production (currently optional)
  - Add `Authorization: Bearer <token>` header to protected endpoints
  - See authentication setup guide for implementation details
- **Environment variables**: Store sensitive data in `.env` file (never commit to git)
- **Input validation**: Validate and sanitize all user inputs
- **Rate limiting**: Implement rate limiting on API endpoints in production
- **HTTPS**: Always use HTTPS in production environments

## 🚀 Backend Deployment

### Heroku Example

```bash
cd backend
heroku create expense-tracker-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key
git push heroku main
```

### Other Platform Considerations

- **Environment Variables**: Ensure all required environment variables are set
- **Database**: Use a production MongoDB instance (MongoDB Atlas recommended)
- **Port Configuration**: Use the PORT environment variable provided by the platform
- **Logging**: Implement proper logging for production debugging

## 🌐 Frontend Deployment

### Netlify

```bash
cd frontend
npm run build
# Deploy the build folder to Netlify
```

Or use Netlify CLI:
```bash
netlify deploy --prod --dir=build
```

### Vercel

```bash
cd frontend
npm run build
# Deploy using Vercel CLI
vercel --prod
```

### Configuration

- **API URL**: Update the API base URL in your frontend configuration to point to your deployed backend
- **Environment Variables**: Set any required environment variables in your hosting platform
- **Build Settings**: Ensure build command is `npm run build` and publish directory is `build`

## 📊 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] HTTPS enabled
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] Authentication implemented (if required)
- [ ] CORS configured properly
- [ ] API documentation published
- [ ] Backup strategy in place
- [ ] Monitoring setup (e.g., error tracking, performance monitoring)
