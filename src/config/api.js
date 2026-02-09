// API configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
  },
  production: {
    baseURL: import.meta.env.VITE_API_URL || 'https://your-domain.com'
  }
}

// Get current environment
const environment = import.meta.env.NODE_ENV || 'development'

// Export the API configuration
export const API_BASE_URL = API_CONFIG[environment].baseURL

// API endpoints
export const API_ENDPOINTS = {
  posts: '/posts',
  health: '/'
}

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`
}