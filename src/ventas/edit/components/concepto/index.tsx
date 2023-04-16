import { CCardBody, CCardImage, CCardText, CCardTitle, CCol, CFormSelect, CRow } from '@coreui/react'
import { OrdenVentaEditContext } from '../../context/OrdenVentaEditContext'
import { CardContainerConcepto, ContainerConcepto } from './styled'
import { parseCantidad } from '../../../../utils/parseCantidad' 
import { OrdenVentaConcepto } from '../../../../types' 
import { FC , useContext } from 'react'
import { useFormik } from 'formik'
import Loader from './Loader'

const Concepto : FC<OrdenVentaConcepto> = ( props ) => {
    
    const { 
        handleEditStatusConcepto,
        loading_concepto
    } = useContext(OrdenVentaEditContext)

    const { producto , cantidad , importe , total , iva , id , status } = props

    const handleChangeStatus = ( event: React.ChangeEvent<HTMLSelectElement> ) => {

        const status = Number(event.target.value)

        setFieldValue("status", status)

        handleEditStatusConcepto(
            id,
            status
        );

    }

    const {
        setFieldValue,
        handleBlur,
        values,
    } = useFormik({
        initialValues: {
            status: status,
        },
        onSubmit: () => {},
        enableReinitialize: true,
    })

    if( loading_concepto ) return <Loader/>

    return (
        <ContainerConcepto>
            <CardContainerConcepto>
                <CRow className="g-0">
                    <CCol md={3}>
                        <CCardImage 
                            src={producto?.imagen[0]} 
                            style={{ borderRadius: 0 }}
                        />
                    </CCol>
                    <CCol md={9}>
                        <CCardBody style={{ paddingTop: 0 }}>
                            <CCardTitle>
                                {
                                    producto?.nombre
                                }
                            </CCardTitle>
                            <CCardText className='mb-2'>
                                {
                                    producto?.descripcion
                                }
                            </CCardText>
                            <hr className='mb-2 mt-2' />
                            <CCardText className='mb-1'>
                                <strong>Cantidad: { cantidad } </strong>
                            </CCardText>
                            <CCardText className='mb-1'>
                                <strong> Importe: { parseCantidad(importe) } </strong>
                            </CCardText>
                            <CCardText className='mb-1'>
                                <strong> IVA: { parseCantidad(iva) } </strong>
                            </CCardText>
                            <CCardText className='mt-0 mb-0'>
                                <strong>Total: { parseCantidad(total) } </strong>
                            </CCardText>
                            
                            <hr className='mb-2 mt-2' />
                            <section>
                                <label className="mb-1">Estado</label>    
                                <CFormSelect
                                    aria-label="Selecciona status"
                                    onChange={handleChangeStatus}
                                    disabled={values.status == 1}
                                    style={{ maxWidth: '50%' }} 
                                    value={values.status}
                                    onBlur={handleBlur}
                                    name='status'
                                    size='sm' 
                                >
                                    <option value={0}>Pendiente</option>
                                    <option value={1}>Terminado</option>
                                </CFormSelect>
                            </section>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CardContainerConcepto>
        </ContainerConcepto>
    )
}

export default Concepto