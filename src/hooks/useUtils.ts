
const useUtils = () => {
  
    const handleRenderDate = ( date : string ) => {

      const fecha = Number(date)

      let _date = new Date(fecha)

      const __date = _date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
			
			return `${__date}`

    }
    
    const handleRenderPrecio = ( monto : number ) => {

      const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      })
      
      return `${formatter.format(monto)} MXN`

    }

    return {
      handleRenderDate,
      handleRenderPrecio
    }
    
}

export default useUtils
