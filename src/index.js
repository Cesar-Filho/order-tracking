import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'
import reducers from './store/reducers'
import 'antd/dist/antd.css'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(ReduxPromise, ReduxThunk)(createStore)(reducers, devTools)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
