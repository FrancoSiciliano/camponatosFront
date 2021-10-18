import NavBarGeneral from "../components/NavBarGeneral/NavBarGeneal"
const lista1 = ["hola","adios","mañana"]
export const Home = () =>{
    return(<div className="contenedorHome">
    <NavBarGeneral enlaces={lista1} />
        <h1>Bienvenidos a Campeonatos</h1>
    </div>
    )
}
