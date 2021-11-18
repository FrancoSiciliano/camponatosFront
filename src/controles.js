import axios from "axios";
import {deprecate} from "@testing-library/jest-dom/dist/utils";

export const contieneNumeros = (string) => {
    return string.match(/\d+/g) !== null;
};

export const contieneCaracteresEspeciales = (string) => {
    const specialChars = "^[A-Za-z0-9 ]*$";
    return string.match(specialChars) === null;
}

export const esUnMail = (string) => {
    return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null;
};

export const yaExisteElMail = async (email) => {
    const admin = await axios.get(`http://localhost:8080/existeMailAdministrador?mail=${email}`);
    const responsable = await axios.get(`http://localhost:8080/existeMailResponsable?mail=${email}`);
    const jugadores = await axios.get(`http://localhost:8080/existeMailJugador?mail=${email}`);

    return (admin.data || responsable.data || jugadores.data);
}