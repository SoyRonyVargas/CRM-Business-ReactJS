import { AppDispatch, RootState } from "../redux/store"
import { useDispatch, useSelector } from 'react-redux'
import { TypedUseSelectorHook } from "react-redux"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: ( ...args : any ) => AppDispatch = useDispatch