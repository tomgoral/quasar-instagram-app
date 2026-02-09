<template>
  <q-page class="constrain q-pa-md">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner-cube color="primary" size="50px" />
      <div class="q-ml-md text-h6">Loading posts...</div>
    </div>

    <!-- Error State with Retry -->
    <div v-else-if="error" class="flex flex-center column q-pa-xl">
      <q-icon name="error" color="negative" size="50px" />
      <div class="text-h6 q-mt-md text-center">Failed to load posts</div>
      <div class="text-body2 text-grey-7 q-mt-sm">{{ error }}</div>
      <q-btn 
        @click="loadPosts" 
        color="primary" 
        label="Retry" 
        class="q-mt-md"
        icon="refresh"
      />
    </div>

    <!-- Posts Content -->
    <div v-else class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card v-for="post in posts" :key="post.id" class="card-post q-mb-md" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
                <img src="src/assets/TomAvatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">tom__goral</q-item-label>
              <q-item-label caption>{{ post.location }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />
          <q-img :src="post.imageUrl" />
          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ formatDate(post.date) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
              <img src="src/assets/TomAvatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">tom__goral</q-item-label>
            <q-item-label caption>Oxford, MI</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import ApiService from '../services/apiService.js'

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [],
      loading: true,
      error: null,
      fallbackPosts: [
        {
          id: 1,
          caption: 'Golden Gate Bridge',
          date: 1733443200000,
          location: 'San Francisco, CA',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg',
        },
        {
          id: 2,
          caption: 'Mountainscape',
          date: 1733529600000,
          location: 'Switzerland',
          imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg',
        },
        {
          id: 3,
          caption: 'Canal View',
          date: 1733616000000,
          location: 'Venice, Italy',
          imageUrl: 'https://cdn.quasar.dev/img/parallax1.jpg',
        },
      ],
    }
  },
  async mounted() {
    await this.loadPosts()
  },
  methods: {
    async loadPosts() {
      try {
        this.loading = true
        this.error = null
        
        // Try to fetch posts from API
        const apiPosts = await ApiService.fetchPosts()
        
        // Enhance API posts with additional data for display
        this.posts = apiPosts.map((post, index) => ({
          id: index + 1,
          caption: post.caption,
          location: post.location,
          date: Date.now() - (index * 86400000), // Mock dates
          imageUrl: this.getImageForPost(post.caption), // Mock images based on caption
        }))
        
      } catch (error) {
        console.error('Failed to load posts from API, using fallback data:', error)
        this.error = error.message
        // Use fallback data if API fails
        this.posts = this.fallbackPosts
      } finally {
        this.loading = false
      }
    },
    
    getImageForPost(caption) {
      // Map captions to appropriate images
      const imageMap = {
        'Golden Gate Bridge': 'https://cdn.quasar.dev/img/parallax2.jpg',
        'London Eye': 'https://cdn.quasar.dev/img/parallax1.jpg',
        'Mountainscape': 'https://cdn.quasar.dev/img/mountains.jpg',
        'Canal View': 'https://cdn.quasar.dev/img/parallax1.jpg',
      }
      
      return imageMap[caption] || 'https://cdn.quasar.dev/img/parallax2.jpg'
    },

    formatDate(epochTimestamp) {
      const date = new Date(epochTimestamp)
      return date.toLocaleDateString()
    },
  },
}
</script>
<style lang="sass">
.card-post
  min-height: 200px
</style>
