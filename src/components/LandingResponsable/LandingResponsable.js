import { useHistory } from "react-router"
import CampeonatosResponsable from "../Gestion/GestionCampeonatos/CampeonatosResponsable"
import NavBarResponsable from "../NavBars/NavBarResponsable"
import { TablaPartidosResponsables } from "../Tablas/Representante/TablaPartidosResponsables"
import './LandingResponsable.css'
export const LandingResponsable = () =>{
    const history = useHistory();
    const idResponsable = history.location.state;
    return(
    <div className="contenedorHome">
    
        <NavBarResponsable id={idResponsable}/>
    
        <div className="TablasHomeCampeonatosResponsables">
            <div className = 'tablas-home-responsable'>
                <CampeonatosResponsable id={idResponsable}/> 
            </div> 
            <div className = 'tablas-home-responsable'>
                <TablaPartidosResponsables id={idResponsable}/>   
            </div>
               
        </div>
    </div>
    )
}
