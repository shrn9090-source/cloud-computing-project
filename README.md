# Note Taking Web Application

A complete note-taking web application built with Node.js, Express, MongoDB, and vanilla JavaScript. Deployed using free tiers of Netlify, Railway, and MongoDB Atlas.

## Features

- Create, read, update, and delete notes
- Responsive design
- RESTful API
- MongoDB database integration
- Docker containerization
- CI/CD with GitHub Actions
- Deployed on free cloud services

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS support

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

### Infrastructure
- Docker & Docker Compose
- Railway (backend deployment)
- Netlify (frontend deployment)
- MongoDB Atlas (database)
- GitHub Actions (CI/CD)

## Project Structure

```
cloud-computing-project/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Note.js
│   │   ├── routes/
│   │   │   └── notes.js
│   │   └── server.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── railway.json
│   └── .env.example
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── index.html
│   ├── package.json
│   └── netlify.toml
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Docker (optional)
- MongoDB Atlas account
- GitHub account
- Railway account
- Netlify account

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cloud-computing-project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB Atlas connection string
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Using Docker (Alternative)**
   ```bash
   cd backend
   docker-compose up --build
   ```

### Deployment

1. **MongoDB Atlas**
   - Create a free cluster
   - Get connection string
   - Add to Railway environment variables

2. **Railway (Backend)**
   - Connect GitHub repository
   - Set environment variables:
     - `MONGODB_URI`
     - `PORT=5000`
   - Deploy

3. **Netlify (Frontend)**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.`
   - Update API_BASE_URL in `js/app.js` to Railway URL

4. **GitHub Actions**
   - Add secrets in your GitHub repository settings:
     - `RAILWAY_TOKEN`: Your Railway CLI token (get from Railway dashboard → Account → Tokens)
     - `RAILWAY_PROJECT_ID`: Your Railway project ID (found in Railway project settings)
     - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token (get from Netlify dashboard → User settings → Applications → Personal access tokens)
     - `NETLIFY_SITE_ID`: Your Netlify site ID (found in Site settings → General → Site details)

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /health` - Health check

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
PORT=5000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test locally
5. Submit a pull request

## License

MIT License