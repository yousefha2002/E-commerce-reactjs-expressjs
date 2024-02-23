import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import shippingReducer from './shipping'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig1 = {
    key: 'root',
    version: 1,
    storage,
}
const persistConfig2 = {
    key: 'roo2',
    version: 1,
    storage,
    }
    
    const rootReducer = combineReducers({ 
        userLogin: persistReducer(persistConfig1, userReducer),
        shipping: persistReducer(persistConfig2, shippingReducer),
    })

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
})

export const persistor = persistStore(store)
