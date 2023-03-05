import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AutenticatedUser, Basic } from '../../types'
import { RootState } from '../store'

export type AuthState = {
  user: AutenticatedUser | null
  token: string | null
  error: string | null
  sidebarShow: boolean
  loading: boolean
  logged: boolean
}

const initialState: AuthState = {
  sidebarShow: true,
  loading: false,
  logged: false,
  error: null,
  token: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCargando: ( state , { payload = true } : PayloadAction<boolean> ) => {
      state.loading = payload
    },
    setUsuario: ( state , { payload } : PayloadAction<AutenticatedUser> ) => {
      state.user = payload
      state.loading = false
      state.error = null
      state.logged = true
    },
    setUsuarioWithToken: ( state , { payload } : PayloadAction<Basic> ) => {
      // state.user = payload
      state.loading = false
      state.error = null
    },
    setAuthError: ( state , { payload } : PayloadAction<string> ) => {
      state.error = payload
      state.loading = false
    },
    setSideBarState: ( state , { payload } : PayloadAction<boolean> ) => {
      state.sidebarShow = payload
    }
  },
})

export const { setAuthError , setUsuario , setCargando , setUsuarioWithToken , setSideBarState } = authSlice.actions

export const selectSideBarState = ( state : RootState ) => state.auth.sidebarShow

export default authSlice