import { CCol } from '@coreui/react'
import { useContext  } from 'react'
import { OrdenVentaEditContext } from '../context/OrdenVentaEditContext'
import Concepto from './concepto'

const ColConceptos = () => {

  const { 
    loading,
    conceptos
  } = useContext(OrdenVentaEditContext)

  if( loading ) return <p>Cargando...</p>;

  return (
    <CCol xs={8}>
      <h4>Conceptos</h4>
      <hr />
      {
          conceptos.map( concepto => (
            <Concepto 
              key={concepto.id}
              {...concepto}
            />
          ))
      }
    </CCol>
  )
}

export default ColConceptos