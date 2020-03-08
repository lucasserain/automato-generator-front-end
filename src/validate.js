const validate = values => {
  const errors = {};
  if (!values.automato) {
    errors.automato = 'Required';
    
  }
  if (!values.estado || !values.estado.length) {
    errors.estado = { _error: 'At least one estado must be entered' };
  } else {
    const estadosArrayErrors = [];
    values.estados.forEach((estado, estadoIndex) => {
      const estadoErrors = {};
      if (!estado || !estado.name) {
        estadoErrors.name = 'Required';
        estadosArrayErrors[estadoIndex] = estadoErrors;
      }
      if (estado && estado.simbolo && estado.simbolo.length) {
        const simbolosArrayErrors = [];
        estado.simbolos.forEach((simbolo, simboloIndex) => {
          if (!simbolo || !simbolo.length) {
            simbolosArrayErrors[simboloIndex] = 'Required';
          }
        });
        if (simbolosArrayErrors.length) {
          estadoErrors.simbolos = simbolosArrayErrors;
          estadosArrayErrors[estadoIndex] = estadoErrors;
        }
        if (estado.simbolos.length > 5) {
          if (!estadoErrors.simbolos) {
            estadoErrors.simbolos = [];
          }
          estadoErrors.simbolos._error = 'No more than five simbolos allowed';
          estadosArrayErrors[estadoIndex] = estadoErrors;
        }
      }
    });
    if (estadosArrayErrors.length) {
      errors.estado = estadosArrayErrors;
    }
  }
  return errors;
};

export default validate;
