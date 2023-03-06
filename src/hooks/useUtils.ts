
const useUtils = () => {
  
    const handleRenderDate = ( date : string ) => {

      const fecha = Number(date)

      let _date = new Date(fecha)

      const __date = _date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
			
			return `${__date}`

    }

    return {
      handleRenderDate
    }
    
}

export default useUtils
