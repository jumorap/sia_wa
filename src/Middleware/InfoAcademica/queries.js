export const queries = (args) => `
{
    getHistory(id: ${args.id}) {
      _documento_identidad
  _id_historia
  _id_programa
  _porcentaje_avance
  _papa
  _pa
  _semestreActual
  _pappi
  _asignaturasInscritas {
    _codigo
    _nombre
    _creditos
    _tipo
    _periodo
    _esConsolidada
    _definitiva
    _esAprobada
  }
  _asignaturas{
    _codigo
  _nombre
  _creditos
  _tipo
  _periodo
  _esConsolidada
  _definitiva
  _esAprobada
  _calificaciones{
    _nombre
  _porcentaje
  _nota
  }
  }
      }
    
  }
  
  `;
