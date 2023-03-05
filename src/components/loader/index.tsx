import { ContainerSpinner } from './styled'
import { CSpinner } from '@coreui/react'
import React from 'react'

const Loader = () => {
  return (
    <ContainerSpinner>
      <CSpinner color="light"/>
    </ContainerSpinner>
  )
}

export default Loader