import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
//theme
import 'primereact/resources/themes/lara-light-blue/theme.css'

// icons
import 'primeicons/primeicons.css'

//core
import 'primereact/resources/primereact.min.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
