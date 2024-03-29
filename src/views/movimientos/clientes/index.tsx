import { CBadge, CButton, CCard, CCardBody, CCardHeader, CSpinner, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { OBTENER_CLIENTES_VENDEDOR } from '../../../graphql/movimientos/clientes'
import useClientesStore from '../../../hooks/useClientesStore'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import { Cliente, WrapperQuery } from '../../../types'
import useUtils from '../../../hooks/useUtils'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

const MainClientesView = () => {

  const { handleDeleteCliente, loading_del } = useClientesStore()

  const { handleRenderDate } = useUtils()

  const { data } = useQuery<WrapperQuery<Cliente[]>>(OBTENER_CLIENTES_VENDEDOR, {
    fetchPolicy: 'no-cache',
    variables: {
      input: {
        nombre: ""
      }
    }
  })

  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>
            Clientes
          </strong>
        </CCardHeader>
        <CCardBody>
            
            <div className='mb-3 d-flex align-items-center justify-content-end'> 
                <Link to={'/movimientos/clientes/nuevo'}>
                  <CButton color="primary" shape="rounded-0">
                      <CIcon icon={cilPlus} className="mr-1" />
                      Agregar Cliente
                  </CButton>
                </Link>
            </div>

            <CTable bordered striped className='datatable no-footer mb-0'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Vendedor</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Correo Electronico</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha Registro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  data?.obtenerClientesVendedor || !loading_del
                  ?
                  data?.obtenerClientesVendedor.map( cliente => {
                    return (
                      <CTableRow id={cliente.id}>
                        <CTableHeaderCell scope="col"> { cliente.nombre } { cliente.apellido} </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> { cliente.vendedor.nombre } </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> { cliente.email } </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          <CBadge color="success">ACTIVO</CBadge>
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          { handleRenderDate(cliente.creado) } 
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">  
                          
                          <Link to={`/movimientos/clientes/edit/${cliente.id}`}>
                            <CButton disabled={loading_del} color="warning" className=''>
                              <CIcon icon={cilPencil} />
                            </CButton>
                          </Link>
                          
                          <CButton disabled={loading_del} onClick={() => handleDeleteCliente(cliente)} color="danger" className='mx-1'>
                            <CIcon icon={cilTrash} />
                          </CButton>
                          
                          {/* <CButton color="primary">
                            <CIcon icon={cilTrash} />
                          </CButton> */}

                        </CTableHeaderCell>
                      </CTableRow>
                    )
                  })
                  :
                  <CTableRow>
                        <CTableHeaderCell scope="col"> 
                          <CSpinner />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          <CSpinner />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          <CSpinner />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          <CSpinner />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          <CSpinner />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">  
                          <CSpinner />
                        </CTableHeaderCell>
                  </CTableRow>
                }
              </CTableBody>          
            </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default MainClientesView