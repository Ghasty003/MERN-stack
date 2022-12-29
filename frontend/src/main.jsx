import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { WorkoutContextProvider } from './context/WorkoutContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <WorkoutContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </WorkoutContextProvider>
  </AuthContextProvider>,
)
