import React from 'react'

const Input = (props) => {

    function _onChange(e){
        console.log(e.target.value);
    }
    return (
        <>
          <label htmlFor={props.name}>{props.label}</label>
          <input 
            type={props.type} 
            name={props.name} 
            placeholder={props.placeholder ? props.placeholder : ''}
            onChange={  e => _onChange(e.target.value)}
          />
        </>
    )
}

export default Input
