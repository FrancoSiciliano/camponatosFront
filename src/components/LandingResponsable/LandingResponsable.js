import CampeonatosResponsable from "../Gestion/GestionCampeonatos/CampeonatosResponsable"
import NavBarResponsable from "../NavBars/NavBarResponsable"
import { TablaPartidosResponsables } from "../Tablas/TablaPartidosResponsables"
import './LandingResponsable.css'
export const LandingResponsable = () =>{
    return(
    <div className="contenedorHome">
        
        <NavBarResponsable/>
    
        <div className="TablasHomeCampeonatosResponsables">
            <div>
                <CampeonatosResponsable/> 
            </div> 
            <div>
                <TablaPartidosResponsables/>   
            </div>
               
        </div>
    </div>
    )
}