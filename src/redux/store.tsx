

import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import authSlice from './feature/auth/authSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'auth',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, authSlice)  

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]:baseApi.reducer,
    auth:persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
})



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
