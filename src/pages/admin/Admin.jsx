import React, { useState, useEffect } from 'react'
import './Admin.css'
import {db, functions} from '../../firebase/config'

const Admin = () => {

    const [ users, setUsers ] = useState([]);

    const callFunction = {
        'addAdmin': {name:'agregarAdmin', rol:'admin'}, 
        'removeAdmin':{name:'quitarAdmin', rol:'invitado'},
        'addAutor': {name:'agregarAutor', rol:'autor'},
        'removeAutor':{name:'quitarAutor', rol:'invitado'}
    }

    useEffect( () => {
        fecthUser();
    }, []);

    const fecthUser = async () => {
        try {
            let result = await db.collection('usuarios').get();
            let data = result.docs.map( anUser => anUser.data());
            setUsers(data);
        } catch (error) {
            console.error(`Modulo Admin - FectUsers. Ocurrior el error ${error}`);
        }
       
    };

    async function _onClickAction (email, option) {
        /*
        Vamos a invocar a una funcion de firebase
        0 - Debimos haber deployado la funcion al server de firebase
        1 - primero obtenemos la funcion a invocar, mediante su  nombre
        2 - hacemos la invocacion con los parametros. Este verifica en el backend si puede hacerlo o no
        3 - En caso de  no poder hacerlo, termina la funcion
        3.1 - Si tiene los permisos, actualizamos el cambio de rol para el usuario
        */
       try {
            let type = callFunction[option];
            console.log(`Ejecutando accion: ${type.name} y cambiando el rol a: ${type.rol}`)
            const onChangeRol = functions.httpsCallable(type.name);
            console.log(`cambiando los permisos a ${email}`);
            let result = await onChangeRol({email: email});
           
            if(result.data.errors){
               return console.error(result.data.errors);
            }
            await db.collection('usuarios').doc(email).update({rol:type.rol});
            console.log(`Usuario Modificado con exito: ${email}`);
            fecthUser();
       } catch (error) {
           console.error(`Modulo Admin - Cambiar Rol. Ocurrio el error ${error}`);
       }

    }

    return (
        <div className="app-container">
            <div className="admin-container">
            <h2>Administrar usuarios</h2>
                <ul className="admin-list-user">
                {
                    users.map( anUser => {
                        return (
                            <li className="admin-list-user-item" key={anUser.uid}>
                                {anUser.email } - <span className="admin-spam">{anUser.rol}</span>
                                <div className="admin-list-buttons">
                                { anUser.rol === 'admin' ? (<button className="admin-btn admin-btn-admin" onClick={e => _onClickAction(anUser.email, 'removeAdmin')}>Remove Admin</button>)
                                :   ( 
                                    <>
                                    <button className="admin-btn admin-btn-admin" onClick={e => _onClickAction(anUser.email, 'addAdmin')}>Admin</button>
                                    <button className="admin-btn admin-btn-autor" onClick={e => _onClickAction(anUser.email, 'addAutor')}>Autor</button>
                                    <button className="admin-btn admin-btn-guest" onClick={e => _onClickAction(anUser.email, 'removeAutor')}>Invitado</button>
                                    </>
                                    )
                                }
                                </div>
                            </li>
                        )
                    })
                }
                </ul>
            </div>

        </div>
    )
}

export default Admin
