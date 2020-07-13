import React, {useState, useEffect } from 'react'
import {db} from '../firebase/config'

export const BooksContext = React.createContext();

const BooksProvider = (props) => {

    const [ libros, setLibros] = useState([])

    useEffect(() =>{
        getBooks();
    }
    ,[]
    );

    async function getBooks (){
        try {
            let data = [];
            
            let result = await db.collection('books').get();
            data = result.docs.map( aBook => {return {...aBook.data(),id: aBook.id}});
            setLibros(data); 

        } catch (error) {
            console.error(`Modulo BooksProvider - getBooks. Ocurrio el error ${error}` ); 
        }
    }
    return (
        <BooksContext.Provider value={ {libros, getBooks}  }>
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksProvider
