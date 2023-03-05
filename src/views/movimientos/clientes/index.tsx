import { CBadge, CButton, CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import useClientesStore from '../../../hooks/useClientesStore'
import React , { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import { cilList, cilPencil, cilTrash } from '@coreui/icons'

const MainClientesView = () => {

  const { handleObtenerClientes , clientes, loading } = useClientesStore()

  useEffect( () => { handleObtenerClientes() } , [] )

  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>
            Clientes
          </strong>
        </CCardHeader>
        <CCardBody>
            {/* <pre>
              {
                JSON.stringify( clientes , null , 3)
              }
            </pre> */}
            <CTable bordered striped color=""  className='datatable no-footer mb-0'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Vendedor</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha Registro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  (!loading && clientes) && clientes?.map( cliente => {
                    return (
                      <CTableRow id={cliente.id}>
                        <CTableHeaderCell scope="col"> { cliente.nombre } { cliente.apellido} </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> { cliente.vendedor.nombre } </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> 
                          <CBadge color="success">ACTIVO</CBadge>
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col"> { new Date(cliente.creado || new Date()).toDateString() } </CTableHeaderCell>
                        <CTableHeaderCell scope="col">  
                          
                          <CButton color="warning" className=''>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          
                          <CButton color="danger" className='mx-1'>
                            <CIcon icon={cilTrash} />
                          </CButton>
                          
                          {/* <CButton color="primary">
                            <CIcon icon={cilTrash} />
                          </CButton> */}

                        </CTableHeaderCell>
                      </CTableRow>
                    )
                  })
                }
              </CTableBody>          </CTable>
          <blockquote className="blockquote mb-0">
          </blockquote>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default MainClientesView