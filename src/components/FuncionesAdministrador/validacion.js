export default function validateInfo(values) {
    let errors = {}; 
    if(values.nroFecha<1){
      errors.nroFecha = 'El numero de fecha tiene que ser mayor a 0';
    } 
    if (!values.nroFecha) {
      errors.nroFecha = 'Se requiere el número de fecha';
    }
    if(values.nroZona<0){
      errors.nroFecha = 'El número de la zona debe ser mayor a 0';
    }
    if (!values.nroZona) {
      errors.nroZona = 'Se requiere el número de zona';
    }
    if (values.categoria<=0) {
      errors.categoria = 'La categoría tiene que ser mayor a 0';
    }
    if (!values.categoria) {
      errors.categoria = 'Se requiere categoría';
    }
 
    if (!values.clubLocal) {
      errors.clubLocal = 'Se requiere el club local';
    }
    if (!values.clubVisitante) {
      errors.clubVisitante = 'Se requiere el club visitante';
    }
    if(values.golesLocal<0){
      errors.golesLocal='El número de goles no puede ser menor a 0'
    }
    if (!values.golesLocal) {
      errors.golesLocal = 'Ingrese el número de goles del club local';
    }
    if(values.golesVisitante<0){
      errors.golesVisitante='El número de goles no puede ser menor a 0'
    }
    if (!values.golesVisitante) {
      errors.golesVisitante = 'Ingrese el número de goles del club visitante';
    }

    if (!values.fechaPartido) {
      errors.fechaPartido = 'Se requiere la fecha del partido';
    }
    if (!values.campeonato) {
      errors.campeonato = 'Se requiere el nombre del campeonato';
    }
    
     
    return errors;
  }