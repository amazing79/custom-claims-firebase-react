import React, {useState, useEffect} from 'react'

const Autor = (props) => {

    const [ autor, setAutor] = useState({});
    const { reference } = props;

    useEffect(() => {
        _getBooks();
    },
    // eslint-disable-next-line 
    []
    );

    async function _getBooks(){
        try {
            //el data del auto es un campo por referencia, por lo cual al consultarlo, recupera la coleccion asociada a su referencia
            //tambien Se podria hacer consultando el uid del autor
            let mailAutor = '';
            const result = await reference.get();
            mailAutor = result.data().email; 
            setAutor(mailAutor)
        } catch (error) {
            console.error(`Modulo Autor - getBooks. Ocurrio el error: ${error}`);
        }
    }

    return (
        <span>
            {autor}
        </span>
    )
}

export default Autor
