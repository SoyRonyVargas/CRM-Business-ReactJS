import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import { FichaContext } from '../../../views/productos/id'
import React, { useContext } from 'react'

const LeftSide = () => {
    
    const { producto } = useContext(FichaContext)

    const imagen = producto?.imagen

    return (
        <>
            <CCarousel>
                <CCarousel controls={imagen?.length > 1}>
                    {
                        imagen?.map( img => (
                            <CCarouselItem key={img}>
                                <CImage 
                                    className="d-block w-100" 
                                    src={img} 
                                    alt="Imagen Producto" 
                                />
                            </CCarouselItem>
                        ))
                    }
                </CCarousel>
            </CCarousel>
        </>
    )
}

export default LeftSide