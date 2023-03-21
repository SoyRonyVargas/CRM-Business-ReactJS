import React, { useState } from 'react'

const useListQuery = () => {
  
    const [ busqueda , setBusqueda ] = useState({
        pagina: 0
    })

    const handlePaginaSiguiente = () => {

        const nuevaPagina = busqueda.pagina + 1

        setBusqueda({
            ...busqueda,
            pagina: nuevaPagina
        })

    }
    
    const handlePaginaAnterior = () => {

        const nuevaPagina = busqueda.pagina + 1

        setBusqueda({
            ...busqueda,
            pagina: nuevaPagina
        })

    }

    return {
        busqueda,
        handlePaginaSiguiente,
        handlePaginaAnterior
    }
}

export default useListQuery
