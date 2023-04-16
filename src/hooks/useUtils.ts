
const useUtils = () => {
  
    const handleRenderDate = ( date : string ) => {

      const fecha = Number(date)

      let _date = new Date(fecha)

      const __date = _date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
			
      let _horas : number | string = _date.getHours()
      let minutos : any = _date.getMinutes()
      let typeHora = "AM"
      
      if( _horas > 12 )
      {
          typeHora = "PM"
      }
      if( minutos < 10 )
      {
          minutos = `0${minutos}`
      }

      return `${__date} ${_horas}:${minutos}${typeHora}`

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
