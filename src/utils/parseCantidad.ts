
export const parseCantidad = ( monto:number ) : string => {

    const monto_formateado = Intl.NumberFormat('es-MX',{
        style:'currency',
        currency:'MXN',
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }).format(monto)

    return monto_formateado;

}