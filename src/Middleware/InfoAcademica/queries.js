export const queries = (args) => `
{
    listHistory(id:${args}, null) {
        _documento_identidad
        _id_historia
        _id_programa
        _porcentaje_avance
        _papa
        _pa
        _pappi
        _semestreActual
        _asignaturas {
            _codigo
            _nombre
            _creditos
            _tipo
            _periodo
            _esConsolidada
            _calificaciones
            _definitiva
            _esAprobada
          }
        
    }
}`;