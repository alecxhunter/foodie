import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from './store'
import { loadRooms } from './actions/roomActions'
import { loadPlots } from './actions/plotActions'
import { loadStrains } from './actions/strainActions'
import App from './containers/app'

store.dispatch(loadRooms())
store.dispatch(loadPlots())
store.dispatch(loadStrains())

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('app')
);