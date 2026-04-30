import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // <-- On importe le Provider Redux
import { store } from './store/index'  // <-- On importe le store qu'on a créé
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)