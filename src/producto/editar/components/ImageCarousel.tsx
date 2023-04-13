import { FormEditContext } from '../context/FormEditContext'
import { ContainerRemoveImage } from '../styled'
import React, { FC , useContext } from 'react'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CImage } from '@coreui/react'

type Props = {
    imagen: string
}

const ImageCarousel: FC<Props> = ({ imagen }) => {
    
    const {
        handleRemoveImagen
    } = useContext(FormEditContext)

    return (
        <ContainerRemoveImage onClick={ () => handleRemoveImagen(imagen) }>
            
            <CIcon 
                className='button__remove'
                icon={cilTrash} 
                size="xl"
            />

            <CImage
                className="d-block w-100"
                src={imagen}
                alt="slide 1"
            />
        </ContainerRemoveImage>
    )
}

export default ImageCarousel