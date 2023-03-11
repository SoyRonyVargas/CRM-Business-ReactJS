import { setAuthError, setUsuario , setCargando, setAutenticated, setCerrarSesion, selectCargandoLogin, setCargandoLogin } from '../redux/auth/authSlice'
import { AuthUser, AutenticatedUser, WrapperQuery, Usuario } from '../types'
import { AUTH_LOGIN_USER , AUTH_OBTENER_USUARIO } from '../graphql/auth'
import { useAppDispatch, useAppSelector } from './useStore'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const NAME_STORAGE = "token"

const useAuthStore = () => {
    
    const [ nuevoUsuario ] = useMutation<WrapperQuery<AutenticatedUser>>(AUTH_LOGIN_USER);
    const [ obtenerUsuarioCB ] = useLazyQuery<WrapperQuery<Usuario>>(AUTH_OBTENER_USUARIO);
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const loadingAuthLogin = useAppSelector( store => store.auth.loading )
    const loadingFormLogin = useAppSelector(selectCargandoLogin)
    const isAutenticated = useAppSelector( store => store.auth.logged )
    const errorAuthLogin = useAppSelector( store => store.auth.error )

    const handleCerrarSesion = () => {

        try
        {
            window.localStorage.removeItem(NAME_STORAGE)
            dispatch(setCerrarSesion())
        }
        catch(err)
        {
            dispatch(setCerrarSesion())
        }

    }

    const handleObtenerToken = () : string | null => {

        try
        {
            
            const token = window.localStorage.getItem(NAME_STORAGE) || null

            return token

        }
        catch(err)
        {
            return null
        }

    }

    const handleGuardarToken = (token : string) : boolean => {

        try
        {
            
            window.localStorage.setItem(NAME_STORAGE , token)

            return true

        }
        catch(err)
        {
            return false
        }

    }

    const handleLoginWithToken = async () => {
        
        try
        {
            
            dispatch(setCargando())

            const { error , data } = await obtenerUsuarioCB({
                variables: {
                    input: handleObtenerToken()
                }
            })

            if( error ){
                dispatch(setAuthError(error.message))
                handleCerrarSesion()
                return;''
            }
            
            dispatch(setUsuario({
                token: handleObtenerToken(),
                usuario: data.obtenerUsuario
            }))

        }
        catch(err)
        {
            dispatch(setAuthError(err.message))
            console.error(err.message);
        }

    }

    const handleLogin = async ( auth : AuthUser ) => {
        
        try
        {

            dispatch(setCargandoLogin())
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { errors , data } = await nuevoUsuario({
                variables: {
                    input: auth
                }
            })

            if( errors ) return dispatch(setAuthError(errors[0].message))

            const token = data.authUsuario.token
            
            const responseToken = handleGuardarToken(token)

            if( !responseToken ) throw new Error("Almacenamiento lleno");

            setTimeout( () => {
                
                dispatch(setUsuario(data.authUsuario))
                
                navigate("/")

            }, 1000)

        }
        catch(err)
        {
            dispatch(setAuthError(err.message))
            console.log(Object.keys(err));
            console.log(err.message);
        }

    }

    const checkAuthOnInit = async () => {

        const token = handleObtenerToken()
        
        if( token )
        {
            dispatch(setAutenticated(true))
            await handleLoginWithToken()
        }
        else
        {
            dispatch(setAutenticated(false))
        }

    }

    return {
        handleCerrarSesion,
        checkAuthOnInit,
        handleLogin,
        isAutenticated, 
        auth_login: {
            loadingForm: loadingFormLogin,
            loading: loadingAuthLogin,
            error: errorAuthLogin
        }
    }

}

export default useAuthStore