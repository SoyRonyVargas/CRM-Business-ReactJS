import { CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import useCard from '../../hooks/useCard'
import { Link } from 'react-router-dom'
import { Producto } from '../../types'
import { CardWrapper } from './style'
import { FC } from 'react'
const CardCatalogo  : FC<Producto> = ({ imagen , nombre , descripcion , id }) => {
    
    const {
        cortarDescripcion
    } = useCard()
  
    return (
    <CardWrapper>
        <Link to={`/producto/${id}`}>
            
            <CCardImage orientation="top" src={imagen[0]} />
            
            <CCardBody>
                <CCardTitle>
                    { nombre }
                </CCardTitle>
                <CCardText>
                    { cortarDescripcion(descripcion) }
                </CCardText>
                <CCardText>
                    {/* <small className="text-medium-emphasis">Last updated 3 mins ago</small> */}
                </CCardText>
            </CCardBody>
        </Link>
    </CardWrapper>
  )
}

export default CardCatalogo