/*
import { useState } from 'react';

function FormInput(props) {
    const {
      label, 
      type = 'text', 
      name, 
      value, 
      onChange
    } = props;
  
    return (
      <div className="FormInput">
        <label>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    )
}


export default FormInput;
*/
import { useContext } from 'react';
import { FormContext } from './Form';

function FormInput(props) {
  const {
    label, 
    type = 'text', 
    name,
  } = props;

  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <div className="FormInput">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleFormChange}
      />
    </div>
  )
}

export default FormInput;
