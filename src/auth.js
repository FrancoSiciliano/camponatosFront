class Auth {

    constructor() {
        this.autenticado = false;
    }

    login(callback) {
        this.autenticado = true;
        localStorage.setItem("autenticado", this.autenticado);
        callback && callback();
    }

    logout(callback) {
        this.autenticado = false;
        localStorage.removeItem("autenticado");
        callback && callback();
    }

    isAutenticado() {
        return localStorage.getItem("autenticado") === "true";
    }
}

export default new Auth();