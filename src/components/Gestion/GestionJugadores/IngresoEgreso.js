import './IngresoEgreso.css'
import NavBarAdministracion from '../../NavBars/NavBarAdministracion'
import { useLocation } from 'react-router';


export const IngresoEgreso = () => {
    const location = useLocation();
    const idPartido = location.state;
    return(
        <div className='contenedor-principal-ingreso-egreso'>
            <NavBarAdministracion/>
            <p> tabla </p>
        </div>
    );
}
