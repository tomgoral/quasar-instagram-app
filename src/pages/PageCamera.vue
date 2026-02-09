<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video v-show="!imageCaptured && !imageProcessing" ref="video" class="full-width" autoplay muted playsinline />
      <canvas v-show="imageCaptured && !imageProcessing" ref="canvas" class="full-width" height="240" />

      <!-- Loading indicator -->
      <div v-show="imageProcessing" class="flex flex-center" style="height: 240px;">
        <q-spinner-cube color="primary" size="50px" />
        <div class="q-ml-md">Processing image...</div>
      </div>
    </div>

    <div class="text-center q-pa-md">
      <q-btn v-if="hasCameraSupport" @click="captureImage" color="grey-10" icon="eva-camera" size="lg" />
      <q-file v-else v-model="imageUpload" @update:model-value="captureImageFallback" accept="image/*"
        label="Choose an Image" outlined max-file-size="10485760">
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input v-model="post.caption" class="col col-sm-6" label="Caption" dense />
    </div>
    <div class="row justify-center q-ma-md">
<q-input
          v-model="post.location"
          :loading="locationLoading"
          class="col col-sm-6"
          label="Location"
          dense
        >        <template v-slot:append>
          <q-btn
            v-if="!locationLoading"
            @click="getLocation"
            icon="eva-navigation-2-outline"
            dense
            flat
            round
          />
        </template>
      </q-input>
    </div> 
    <div class="row justify-center q-mt-lg">
      <q-btn 
        @click="submitPost" 
        :loading="submitting"
        :disable="!post.caption || !post.location || !imageCaptured"
        label="Post Image" 
        color="primary" 
        rounded 
        unelevated 
      />
    </div>

  </q-page>
</template>

<script>
import { uid } from 'quasar'
import ApiService from '../services/apiService.js'
import 'md-gum-polyfill'
export default {
  name: 'PageCamera',
  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: null,
      hasCameraSupport: true,
      imageProcessing: false,
      cameraStream: null,
      locationLoading: false,
      submitting: false
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.cameraStream = stream
          this.$refs.video.srcObject = stream
        })
        .catch(() => {
          this.hasCameraSupport = false
        })
    },
    captureImage() {
      const video = this.$refs.video
      const canvas = this.$refs.canvas

      // Use reasonable canvas size instead of full video dimensions
      const maxWidth = 800
      const maxHeight = 600
      const videoRect = video.getBoundingClientRect()

      let { width, height } = this.calculateOptimalSize(videoRect.width, videoRect.height, maxWidth, maxHeight)

      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'

      context.drawImage(video, 0, 0, width, height)
      this.imageCaptured = true
      this.post.photo = this.dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8)) // Add compression
      this.disableCamera()
    },

    captureImageFallback(file = null) {
      const selectedFile = file || this.imageUpload
      if (!selectedFile) return

      console.log('Processing file:', selectedFile)
      this.post.photo = selectedFile
      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      // Set loading state
      this.imageProcessing = true

      var reader = new FileReader();
      reader.onload = event => {
        var img = new Image()
        img.onload = () => {
          // Optimize canvas size - limit to reasonable dimensions
          const maxWidth = 800
          const maxHeight = 600

          let { width, height } = this.calculateOptimalSize(img.width, img.height, maxWidth, maxHeight)

          canvas.width = width
          canvas.height = height

          // Use higher quality scaling
          context.imageSmoothingEnabled = true
          context.imageSmoothingQuality = 'high'

          // Draw scaled image
          context.drawImage(img, 0, 0, width, height)

          this.imageCaptured = true
          this.imageProcessing = false
        }
        img.onerror = () => {
          console.error('Error loading image')
          this.imageProcessing = false
        }
        img.src = event.target.result
      }
      reader.onerror = () => {
        console.error('Error reading file')
        this.imageProcessing = false
      }
      reader.readAsDataURL(selectedFile)
    },

    disableCamera() {
      try {
        if (this.cameraStream) {
          const tracks = this.cameraStream.getTracks()
          tracks.forEach(track => {
            track.stop()
          })
          this.cameraStream = null
        }

        if (this.$refs.video) {
          this.$refs.video.srcObject = null
        }
      } catch (error) {
        console.warn('Error disabling camera:', error)
      }
    },

    calculateOptimalSize(originalWidth, originalHeight, maxWidth, maxHeight) {
      if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
        return { width: originalWidth, height: originalHeight }
      }

      const widthRatio = maxWidth / originalWidth
      const heightRatio = maxHeight / originalHeight
      const ratio = Math.min(widthRatio, heightRatio)

      return {
        width: Math.floor(originalWidth * ratio),
        height: Math.floor(originalHeight * ratio)
      }
    },

    dataURItoBlob(dataURI) {
      // Source - https://stackoverflow.com/questions/12168909/blob-from-dataurl

      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      var blob = new Blob([ab], { type: mimeString });
      return blob;

    },

    getLocation() {
      this.locationLoading = true
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser.')
        return
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          this.post.location = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`
          this.getCityAndCountry(latitude, longitude)
          this.locationLoading = false
        },
        error => {
          console.error('Error getting location:', error)
          this.locationLoading = false
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    },

    getCityAndCountry(latitude, longitude) {    
      // Reverse geocoding using a public API (geocode.xyz)
      fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
        .then(response => response.json())
        .then(data => {
          if (data.city && data.country) {
            this.post.location = `${data.city}, ${data.country}`
          }
        })
        .catch(error => {
          this.$q.dialog({
            title: 'Location Error',
            message: 'Unable to fetch city and country information.'
          })
          console.error('Error fetching city and country:', error)
        })
      
    },

    async submitPost() {
      if (!this.post.caption || !this.post.location || !this.imageCaptured) {
        this.$q.notify({
          color: 'negative',
          message: 'Please add a caption, location, and capture an image',
          icon: 'warning'
        })
        return
      }

      try {
        this.submitting = true
        
        const postData = {
          caption: this.post.caption,
          location: this.post.location
          // Note: Image upload would require additional backend setup with file handling
        }
        
        await ApiService.createPost(postData)
        
        this.$q.notify({
          color: 'positive',
          message: 'Post created successfully!',
          icon: 'check'
        })
        
        // Reset form
        this.resetForm()
        
        // Navigate back to home page to see the new post
        this.$router.push('/')
        
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Failed to create post. Please try again.',
          icon: 'error'
        })
        console.error('Error submitting post:', error)
      } finally {
        this.submitting = false
      }
    },

    resetForm() {
      this.post = {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      }
      this.imageCaptured = false
      this.imageUpload = null
      this.initCamera()
    },

  },
  watch: {
    imageUpload(newFile) {
      if (newFile) {
        this.$nextTick(() => {
          this.captureImageFallback()
        })
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // Cleanup camera when leaving the page
    if (this.hasCameraSupport && this.cameraStream) {
      this.disableCamera()
    }
    next()
  },
  mounted() {
    this.initCamera()
  },

  beforeUnmount() {
    // Final cleanup when component is destroyed
    if (this.hasCameraSupport && this.cameraStream) {
      this.disableCamera()
    }
  }
}
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
</style>
