import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import { MdAdd } from 'react-icons/md';
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderSimbolos = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()} >
        <MdAdd size={24} color='#FFF' />
        Add Simbolo</button>
    </li>
    {fields.map((simbolo, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remover Simbolo"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={`${simbolo}.name`}
          type="text"
          component={renderField}
          label={`Simbolo ${index + 1}`}
        />
        <Field
          name={`${simbolo}.estado`}
          type="text"
          component={renderField}
          label={`Vai para estado #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderEstados = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Estado</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((estado, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remover Estado"
          onClick={() => fields.remove(index)}
        />
        <h4>Estado {index + 1}</h4>
        <Field
          name={`${estado}.name`}
          type="text"
          component={renderField}
          label="Nome"
        />
        <div>
        <label>Estado Inicial?</label>
          <div>
            <label>
              <Field
                name={`${estado}.isInitial`}
                type="radio"
                value="true"
                component={renderField}
                label="Sim"
              />
            </label>
            <label>
              <Field
                name={`${estado}.isInitial`}
                type="radio"
                value="false"
                component={renderField}
                label="Nao"
              />
            </label>
          </div>
        </div>

        <div>
        <label>Estado Final?</label>
          <div>
            <label>
              <Field
                name={`${estado}.isFinal`}
                type="radio"
                value="true"
                component={renderField}
                label="Sim"
              />
            </label>
            <label>
              <Field
                name={`${estado}.isFinal`}
                type="radio"
                value="false"
                component={renderField}
                label="Nao"
              />
            </label>
          </div>
        </div>

        <FieldArray name={`${estado}.simbolos`} component={renderSimbolos} />
      </li>
    ))}
  </ul>
);

const renderAutomato = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Criar Automato</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
     {fields.map((automato, index) => (
      <li key={index}>
      <Field
        name={`${automato}.name`}
        type="text"
        component={renderField}
        label="Nome do Automato"
        
      />
      <MdAdd size={24} color='#FFF' />
        <div>
        <label>Tipo de codigo</label>
          <div>
            <label>
              <Field
                name={`${automato}.type`}
                type="radio"
                value="function"
                component={renderField}
                label="Funcao"
              />
            </label>
            <label>
              <Field
                name={`${automato}.type`}
                type="radio"
                value="goto"
                component={renderField}
                label="Goto"
              />
            </label>
          </div>
        </div>
        
        <FieldArray name={`${automato}.estados`} component={renderEstados} />
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="automato" component={renderAutomato} />
      <div>
        <button type="submit" disabled={submitting}>Enviar</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Limpar valores
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
