import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppPublic from './AppPublic.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppPublic />
    </StrictMode>,
)
