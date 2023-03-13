
const MAX_CARACTERES = 100

const useCard = () => {
  
    const cortarDescripcion = ( text : string ) => {

        if( text.length > MAX_CARACTERES )
        {
            return text.slice( 0 , MAX_CARACTERES ).concat("...")
        }

        return text

    }

    return {
        cortarDescripcion
    }
}

export default useCard