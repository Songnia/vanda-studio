import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/template/i18n' // ← initialise i18n globalement avant le rendu
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
