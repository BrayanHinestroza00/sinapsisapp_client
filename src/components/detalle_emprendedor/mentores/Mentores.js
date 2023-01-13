import React from 'react'
import Tabla from '../../../../Shared/components/ReactFlexyTableWOA'

function Mentores(props) {
    const data = [{ Cedula: 123, Nombre: 'Juan' }, { Cedula: 1234, Nombre: 'Juan' }]
    return (
        <Tabla titulo={"mentores de " + props.nombre}  datos={data} add={true}/>
    )
}

export default Mentores
