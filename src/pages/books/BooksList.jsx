import React, {useContext} from 'react'
import './BooksList.css'

import {BooksContext} from '../../context/BooksProvider'
import Autor from './components/Autor'

const BooksList = () => {

    const { libros } = useContext(BooksContext);
    
    return (
        <div className="app-container">
            <h2>Cat&aacute;logo de Libros</h2>
            {
                !libros ? (<p>No hay libros, papacho</p>) 
                :(
                    <ul className="booklist-list">
                     {
                        libros.map(aBook => (
                            <li key={aBook.id} className="booklist-item">
                            <div className="book-list-col">
                                <span className="booklist-span">Titulo: {aBook.title}</span>
                                <span>
                                    <b>Tema: </b>{aBook.subject} 
                                </span>
                                <span>
                                    <b>Cap&iacute;tulos: </b>{aBook.chapters} 
                                </span>
                            </div>
                            <div className="booklist-span-autor">
                                <Autor author={aBook.author} authorId={aBook.uid} bookId={aBook.id}/>
                            </div>
                            </li>
                        ))
                     }
                    </ul>
                )
            }
        </div>
    )
}

export default BooksList
