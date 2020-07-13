import React, {useContext} from 'react'

import {BooksContext} from '../../context/BooksProvider'
import Autor from './components/Autor'

const BooksList = () => {

    const { libros } = useContext(BooksContext);
    return (
        <div>
            <h2>Cat&aacute;logo de Libros</h2>
            {
                !libros ? (<p>No hay libros, papacho</p>) 
                :(
                    <ul>
                     {
                        libros.map(aBook => (
                            <li key={aBook.id}>
                                <span>{aBook.title}</span> - <Autor reference={aBook.author} />
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
