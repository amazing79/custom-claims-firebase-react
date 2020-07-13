import React, { useState, useContext } from 'react'
import './Books.css'
import {db} from '../../firebase/config'
import {UserContext} from '../../context/UserProvider'
import {BooksContext} from '../../context/BooksProvider'

import Input from '../../commons/components/input/Input'
import Actions from '../../commons/utils/actions'

const Books = (props) => {

    const booksTemplate = {uid:0, author:'', title:'', subject:'', chapters:''}

    const [aBook, setABook ] = useState(Object.assign({}, booksTemplate));

    const {user} = useContext(UserContext);
    const {getBooks} = useContext(BooksContext);
    const { setAction } = props

    function _setData(value){
        setABook(value);
    }

    function _handleSubmit(e){
        e.preventDefault();
        if (!aBook.title.trim() || !aBook.subject.trim() || !aBook.chapters.trim()){
            console.error('Falta completar campos');
            return 
        }
        //todo correcto, agrego el libro
        _addBook();
        //para limpiar los datos
        setABook(Object.assign({}, booksTemplate));
    }

    async function _addBook(){
        try {
            await db.collection('books').add(
                {
                    title: aBook.title,
                    subject: aBook.subject,
                    chapters: aBook.chapters,
                    uid: user.uid,
                    author: db.collection('usuarios').doc(user.email)
                }
            )
            getBooks();
            setAction(Actions.SHOW_HOME);
            
        } catch (error) {
            console.error(`Modulo Books - addBook. Ocurrio el error ${error}` ); 
        }
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
