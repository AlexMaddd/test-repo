# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Run these scripts in project directory:

### npm run dev

runs app in development mode 
http://localhost:5173/ is the default 
port number can be set in vite.config.ts

export default defineConfig({
  plugins: [react()],
  port: *new port number*
})



### npm run build

builds app and creates dist folder