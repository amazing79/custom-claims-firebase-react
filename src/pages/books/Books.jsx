import React, { useState } from 'react'
import './Books.css'

import Input from '../../commons/components/input/Input'

const Books = () => {

    const booksTemplate = {uid:0, author:'', title:'', subject:'', chapters:''}

    const [aBook, setABook ] = useState(Object.assign({}, booksTemplate));

    function _setData(value){
        setABook(value);
    }

    function _handleSubmit(e){
        e.preventDefault();
        setABook(Object.assign({}, booksTemplate));
        console.log( 'Te cache!!');
    }

    return (
        <div className="app-container">
            <h2>Administrar libros</h2>
            <form className="books-form-container" onSubmit={_handleSubmit}>
                <Input 
                    type="text"
                    name="titulo"
                    label="Titulo:"
                    placeholder="Ingrese un nombre"
                    value={aBook.title}
                    setValue={ e => _setData({...aBook, title:e.target.value})}
                />
                <Input 
                    type="text"
                    name="Tematica"
                    label="Tematica:"
                    placeholder="Ingrese la tematica"
                    value={aBook.subject}
                    setValue={ e => _setData({...aBook, subject:e.target.value})}
                />
                <Input 
                    type="text"
                    name="Capitulos"
                    label="Capitulos:"
                    placeholder="Ingrese cantidad"
                    value={aBook.chapters}
                    setValue={ e => _setData({...aBook, chapters:e.target.value})}
                />
                <div className="books-panel-btn">
                    <button className="books-btn books-btn-right">Agregar</button>
                </div>
            </form>
        </div>
    )
}

export default Books
