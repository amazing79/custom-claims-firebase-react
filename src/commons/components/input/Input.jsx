import React from 'react'
import './Input.css'

const Input = (props) => {

    return (
        <div className="input-container">
          <label className="input-label" htmlFor={props.name}>{props.label}</label>
          <input className="input-component"
            type={props.type} 
            name={props.name} 
            value={props.value}
            placeholder={props.placeholder ? props.placeholder : ''}
            onChange={props.setValue}
          />
        </div>
    )
}

export default Input
