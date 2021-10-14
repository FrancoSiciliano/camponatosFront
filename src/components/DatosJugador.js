import React from 'react';
import './datosjugador.css';
import Avatar from '../assets/images/avatar-perfil.jpg';

export const DatosJugador = () => {
    return (
        <>
            <div className = 'header'>
                <div className = 'title'> 
                    <h2>Perfil del Jugador</h2> 
                </div>
            </div>
            <div className = 'main'>
                <div className = 'avatar'>
                    <img src = {Avatar} alt = 'avatarPerfil'/>
                </div>
                <div className = 'container-sm'>
                    <form class="row g-3">
                        <div class="col-md-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" readOnly/>
                        </div>
                        <div class="col-md-3">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellido" readOnly/>
                        </div>
                        <div class="col-4">
                            <label for="direccion" class="form-label">Dirección</label>
                            <input type="text" class="form-control" id="direccion" placeholder="Nombre calle 123"/>
                        </div>
                        <div class="col-6">
                            <label for="mail" class="form-label">E-Mail</label>
                            <input type="text" class="form-control" id="mail"/>
                        </div>
                        <div class="col-4">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" id="telefono"/>
                        </div>
                        <div className="col-12 boton" >
                            <button type="submit" class="btn btn-success">Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}