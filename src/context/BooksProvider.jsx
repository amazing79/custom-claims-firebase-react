import React, {useState, useEffect } from 'react'
import {db} from '../firebase/config'

export const BooksContext = React.createContext();

const BooksProvider = (props) => {

    const [ libros, setLibros] = useState({})

    useEffect(() =>{
        _getBooks();
    }
    ,[]
    );

    async function _getBooks (){
        try {
            let data = [];
            
            let result = await db.collection('books').get();

            data = result.docs.map( aBook => ({...aBook.data(),id: aBook.id}));
            setLibros(data); 

        } catch (error) {
            console.error(`Modulo BooksProvider - getBooks. Ocurrio el error ${error}` ); 
        }
    }
    return (
        <BooksContext.Provider value={ libros }>
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksProvider
