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