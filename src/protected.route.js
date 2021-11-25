import {Redirect, Route} from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({componente: Component, rol, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth.isAutenticado() && rol.includes(localStorage.getItem("rol"))) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }
        }/>
    )
}