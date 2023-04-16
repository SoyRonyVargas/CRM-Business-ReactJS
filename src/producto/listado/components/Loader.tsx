import { CSpinner, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'

const Loader = () => {
    return (
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
    )
}

export default Loader