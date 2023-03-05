import { Formik , useFormik } from 'formik'

type Values = {
    [key: string]: string
}

interface Config {
    values: Values
    onSubmit: ( values : Values ) => any
}

const useForm = <T>( config : Config ) => {
  
    const formik = useFormik({
        initialValues: config.values,
        onSubmit: config.onSubmit
    })

    return formik

}

export default useForm