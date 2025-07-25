import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'health.csiodev.com',
      'health.art',
      'localhost',
    ],
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: /^.*\/VPSidebar\.vue$/,
  //       replacement: fileURLToPath(
  //         new URL('./components/CustomSidebar.vue', import.meta.url)
  //       )
  //     }
  //   ]
  // },
})
