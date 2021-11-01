export default function validateInfo(values) {
    let errors = {}; 
    if(values.nroFecha<=0){
      errors.nroFecha = 'El numero de fecha tiene que ser mayor a 0';
    } 
    if (!values.nroFecha) {
      errors.nroFecha = 'Se requiere NroFecha';
    }
    if(values.nroZona<=0){
      errors.nroFecha = 'El numero de la zona tiene que ser mayor a 0';
    }
    if (!values.nroZona) {
      errors.nroZona = 'Se requiere NroZona';
    }
    if (values.categoria<=0) {
      errors.categoria = 'La categoria tiene que ser mayor a 0';
    }
    if (!values.categoria) {
      errors.categoria = 'Se requiere Categoria';
    }
 
    if (!values.clubLocal) {
      errors.clubLocal = 'Se requiere clubLocal';
    }
    if (!values.clubVisitante) {
      errors.clubVisitante = 'Se requiere clubVisitante';
    }
    if(values.golesLocal<0){
      errors.golesLocal='El numero de goles no puede ser menor a 0'
    }
    if (!values.golesLocal) {
      errors.golesLocal = 'Ingrese Numero de goles locales';
    }
    if(values.golesVisitante<0){
      errors.golesVisitante='El numero de goles no puede ser menor a 0'
    }
    if (!values.golesVisitante) {
      errors.golesVisitante = 'Ingrese Numero de goles visitantes';
    }

    if (!values.fechaPartido) {
      errors.fechaPartido = 'Se requiere la fehca del partido';
    }
    if (!values.campeonato) {
      errors.campeonato = 'Se requiere el nombre del campeonato';
    }
    
     
    return errors;
  }