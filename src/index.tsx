import 'react-app-polyfill/stable'
import 'core-js'

import { ApolloProvider } from '@apollo/client'
import 'react-toastify/dist/ReactToastify.css'
import { createRoot } from 'react-dom/client'

import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { client } from './config/apollo'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './scss/style.scss'
import React from 'react'
import App from './App'

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    </Provider>,
)

reportWebVitals()