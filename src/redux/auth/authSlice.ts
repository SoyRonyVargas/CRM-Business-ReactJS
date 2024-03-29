import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AutenticatedUser, Basic } from '../../types'
import { RootState } from '../store'

export type AuthState = {
  user: AutenticatedUser | null
  token: string | null
  error: string | null
  sidebarShow: boolean
  loadingForm: boolean
  loading: boolean
  carrito: number
  logged: boolean
}

const initialState: AuthState = {
  loadingForm: false,
  sidebarShow: true,
  loading: false,
  logged: true,
  error: null,
  token: null,
  user: null,
  carrito: 0
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCargando: ( state , { payload = true } : PayloadAction<boolean> ) => {
      state.loading = payload
    },
    setCargandoLogin: ( state , { payload = true } : PayloadAction<boolean> ) => {
      state.loadingForm = payload
    },
    setUsuario: ( state , { payload } : PayloadAction<AutenticatedUser> ) => {
      state.loadingForm = false
      state.loading = false
      state.user = payload
      state.logged = true
      state.error = null
    },
    setAutenticated: ( state , { payload }: PayloadAction<boolean> ) => {
      state.logged = payload
    },
    setUsuarioWithToken: ( state ) => {
      state.loading = false
      state.error = null
    },
    setAuthError: ( state , { payload } : PayloadAction<string> ) => {
      state.loadingForm = false
      state.error = payload
      state.loading = false
    },
    setSideBarState: ( state , { payload } : PayloadAction<boolean> ) => {
      state.sidebarShow = payload
    },
    setCerrarSesion: ( state ) => {
      state.logged = false
      state.token = null
      state.user = null
    },
    setTotalCarrito: ( state , { payload } : PayloadAction<number> ) => {
      state.carrito = payload
    }
  },
})

export const { setCargandoLogin , setAuthError , setUsuario , setCargando , setUsuarioWithToken , setSideBarState , setAutenticated , setCerrarSesion , setTotalCarrito } = authSlice.actions

export const selectSideBarState = ( state : RootState ) => state.auth.sidebarShow
export const selectCargandoLogin = ( state : RootState ) => state.auth.loadingForm
export const selectTotalCarrito = ( state : RootState ) => state.auth.carrito

export default authSlice