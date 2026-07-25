import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Toaster } from "sonner";
import { motion } from "framer-motion";

createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <App />
  </motion.div>

  <Toaster />
</StrictMode>
)
