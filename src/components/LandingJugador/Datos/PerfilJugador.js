import './PerfilJugador.css'
import React from 'react'

export const PerfilJugador = (props) => {
    const jugador = props.jugadorData;
    const stats = props.estadisticas;

    return (
        <div className='contenedorprincipal'>

            <div className='datos'>

                <div className='datospersonales'>
                    <h1 className="title">Datos personales</h1>
                    <div className="datos-formulario">
                        <div className="atributos">
                            <p>Nombre:</p>
                            <p>Apellido:</p>
                            <p>Fecha de Nacimiento:</p>
                            <p>Categoria:</p>
                            <p>Tipo de documento:</p>
                            <p>Documento:</p>
                        </div>
                        <div className="valores">
                            <p>{jugador.nombre}</p>
                            <p>{jugador.apellido}</p>
                            <p>{jugador.fechaNacimiento}</p>
                            <p>{jugador.categoria}</p>
                            <p>{jugador.tipoDocumento}</p>
                            <p>{jugador.documento}</p>
                        </div>
                        <div className="atributos">
                            <p>Estado:</p>
                            <p>Fecha de Alta:</p>
                            <p>Direccion:</p>
                            <p>Mail:</p>
                            <p>Telefono:</p>
                        </div>
                        <div className="valores">
                            <p>{jugador.estado ? "Activo" : "Inactivo"}</p>
                            <p>{jugador.fechaAlta}</p>
                            <p>{jugador.direccion}</p>
                            <p>{jugador.mail}</p>
                            <p>{jugador.telefono}</p>
                        </div>
                    </div>
                </div>

                <div className='datosclub'>
                    <h1 className="title">Datos Club</h1>
                    <div className="datos-formulario-club">
                        <div className="atributos">
                            <p>Nombre:</p>
                            <p>Dirección:</p>
                        </div>
                        <div className="valores">
                            <p>{jugador.club.nombre}</p>
                            <p>{jugador.club.direccion}</p>
                        </div>
                    </div>
                </div>

                <div className='stats'>
                    <h1 className="title">Estadísticas</h1>
                    <div className="datos-formulario-stats">
                        <div className="atributos">
                            <p>PJ</p>
                            <p>Goles:</p>
                        </div>
                        <div className="valores">
                            <p>{stats.cantJugados}</p>
                            <p>{stats.cantGoles}</p>
                        </div>
                        <div className="atributos">
                            <p>Amarillas:</p>
                            <p>Rojas:</p>
                        </div>
                        <div className="valores">
                            <p>{stats.cantAmarillas}</p>
                            <p>{stats.cantRojas}</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}