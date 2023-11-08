import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite';
import { dependencies } from './package.json';




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  base: "/vite-deploy/",
  modulePreload: {
    resolveDependencies: (filename, deps, { hostId, hostType }) => {
      return deps.filter(condition)
  
    },
  },

})

