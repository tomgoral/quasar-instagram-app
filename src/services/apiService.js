// API service for handling HTTP requests
import { buildApiUrl, API_ENDPOINTS } from '../config/api.js'

class ApiService {
  async fetchPosts() {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.posts))
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const posts = await response.json()
      return posts
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw error
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.health))
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const health = await response.json()
      return health
    } catch (error) {
      console.error('Error checking health:', error)
      throw error
    }
  }

  async createPost(postData) {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.posts), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const newPost = await response.json()
      return newPost
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }
}

export default new ApiService()