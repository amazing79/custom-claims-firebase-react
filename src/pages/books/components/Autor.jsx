import React, {useState, useEffect, useContext} from 'react'
import './Autor.css'
import {UserContext} from '../../../context/UserProvider'
import {BooksContext} from '../../../context/BooksProvider'
import {db} from '../../../firebase/config'

const Autor = (props) => {

    const [ autor, setAutor] = useState('');

    const { author, authorId, bookId } = props;

    const {user} = useContext(UserContext);
    const {getBooks} = useContext(BooksContext); 

    useEffect(() => {
        _getAuthor();
    },
    // eslint-disable-next-line 
    []
    );

    async function _deleteBook(){
        try {
            await db.collection('books').doc(bookId).delete();
            //una vez eliminado el libro, debo actualizar el listado
            getBooks();
        } catch (error) {
            console.error(`Modulo Autor - _deleteBook. Ocurrio el error: ${error}`);
        }
       
    }

    async function _getAuthor(){
        try {
            //el data del auto es un campo por referencia, por lo cual al consultarlo, recupera la coleccion asociada a su referencia
            //tambien Se podria hacer consultando el uid del autor
            let mailAutor = '';
            const result = await author.get();
            mailAutor = result.data().email;
            setAutor(mailAutor)
        } catch (error) {
            console.error(`Modulo Autor - getBooks. Ocurrio el error: ${error}`);
        }
    }

    return (
        <span className="autor-span">
            <p>{autor}</p>
            {
                //Si es usuario que lo creo, entonces podra elimarlo
                ((authorId === user.uid && user.rol === 'autor') || user.rol === 'admin') && ( <button className="autor-btn" onClick={_deleteBook}>Eliminar</button>)
            }
        </span>
    )
}

export default Autor
