/* Dependencies */
const express = require('express')
const cors = require('cors')

/* Config Express Server */
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

/* Endpoints */

// In-memory posts storage (in production, you'd use a database)
let posts = [
  {
    id: 1,
    caption: "Golden Gate Bridge",
    location: "San Francisco, CA",
    date: Date.now() - 86400000
  },
  {
    id: 2,
    caption: "London Eye", 
    location: "London, UK",
    date: Date.now() - 172800000
  }
]

app.get('/posts', (request, response) => {
  // Return posts sorted by date (newest first)
  const sortedPosts = posts.sort((a, b) => b.date - a.date)
  response.json(sortedPosts)
})

// Create new post
app.post('/posts', (request, response) => {
  try {
    const { caption, location } = request.body
    
    if (!caption || !location) {
      return response.status(400).json({ 
        error: 'Caption and location are required' 
      })
    }
    
    const newPost = {
      id: posts.length + 1,
      caption: caption.trim(),
      location: location.trim(),
      date: Date.now()
    }
    
    posts.push(newPost)
    response.status(201).json(newPost)
    
  } catch (error) {
    console.error('Error creating post:', error)
    response.status(500).json({ error: 'Failed to create post' })
  }
})


// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() })
})

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
