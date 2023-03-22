import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import { FichaContext } from '../../../views/productos/id'
import React, { useContext } from 'react'

const LeftSide = () => {

    const { producto } = useContext(FichaContext)

    const imagen = producto?.imagen

    debugger

    const Childrens = () => (
        <>
            
        </>
    )

    if( !imagen ) return <p>Loading...</p>;

    return (
        <>
            {/* <pre>
                {
                    JSON.stringify( imagen , null , 3)
                }
            </pre> */}
            <CCarousel controls>
                {
                    imagen?.map(img => (
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
        </>
    )
}

export default LeftSide