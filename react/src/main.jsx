import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ListProvider } from '@/providers/ListProvider.jsx'

createRoot(document.getElementById('root')).render(
    <ListProvider>
    <App />
    </ListProvider>
)
