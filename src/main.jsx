import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalContextComponent } from './components/context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextComponent>
      <App />
    </GlobalContextComponent>
  </React.StrictMode>,
)
