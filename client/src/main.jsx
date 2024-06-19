import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="746216880379-9f7vvvn24hm7ps9qsrb9ubv6er6r52cm.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>,
</GoogleOAuthProvider>
)
