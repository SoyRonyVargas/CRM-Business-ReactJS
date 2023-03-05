import { configureStore } from '@reduxjs/toolkit'
import authSlice, { AuthState } from './auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck : false })
})

export type RootState = {
  auth: AuthState
}

export type AppDispatch = typeof store.dispatch