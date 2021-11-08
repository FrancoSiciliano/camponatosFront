import CampeonatosResponsable from "../Gestion/GestionCampeonatos/CampeonatosResponsable"
import NavBarResponsable from "../NavBars/NavBarResponsable"
import { TablaPartidosResponsables } from "../Tablas/TablaPartidosResponsables"
import './LandingResponsable.css'
export const LandingResponsable = () =>{
    return(
    <div className="contenedorHome">
        
        <NavBarResponsable/>
    
        <div className="TablasHomeCampeonatosResponsables">
            <div className = 'tablas-home-responsable'>
                <CampeonatosResponsable/> 
            </div> 
            <div className = 'tablas-home-responsable'>
                <TablaPartidosResponsables/>   
            </div>
               
        </div>
    </div>
    )
}
