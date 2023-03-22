import { Badge, CarritoWrapper, ContainerCarrito } from './styled'
import { cilCart } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuthStore from '../../hooks/useAuthStore'

const Carrito = () => {
  
  const { totalItemsCarrito } = useAuthStore()

  return (
    <ContainerCarrito className="nav-item">
        <Badge> { totalItemsCarrito } </Badge>
        <CarritoWrapper color="primary" textColor="white">
            <CIcon icon={cilCart} />
        </CarritoWrapper>
    </ContainerCarrito>
  )
}

export default Carrito
