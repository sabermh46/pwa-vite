// service-worker.js
import { offlineFallback } from 'workbox-recipes'

offlineFallback({
  pageFallback: '/offline.html'
})