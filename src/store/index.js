import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';
import reducers from '../reducers';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

const config = {
    key: 'wenativesmaps',
    storage: localForage,
    whitelist: ['auth', '_persist']
}

export default function configureStore(initialState) {
    const store = createStore(persistCombineReducers(config, reducers), initialState, applyMiddleware(thunk, logger));
    const persistor = persistStore(store);

    return { persistor, store };
}
