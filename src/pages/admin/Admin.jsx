import React, { useState, useEffect } from 'react'
import './Admin.css'
import {db, functions} from '../../firebase/config'

const Admin = () => {

    const [ users, setUsers ] = useState([]);

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

    async function _onClickAdmin (email) {
        /*
        Vamos a invocar a una funcion de firebase
        0 - Debimos haber deployado la funcion al server de firebase
        1 - primero obtenemos la funcion a invocar, mediante su  nombre
        2 - hacemos la invocacion con los parametros. Este verifica en el backend si puede hacerlo o no
        3 - En caso de  no poder hacerlo, termina la funcion
        3.1 - Si tiene los permisos, actualizamos el cambio de rol para el usuario
        */
       try {
           const onChangeRol = functions.httpsCallable('agregarAdmin');
           console.log(`cambiando los permisos a ${email}`);
           let result = await onChangeRol({email: email});
           
           if(result.data.errors){
               return console.error(result.data.errors);
           }
           let user = await db.collection('usuarios').doc(email).update({rol:'admin'});
           console.log(`Usuario Modificado con exito: ${user}`);
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
                                    <button className="admin-btn admin-btn-admin" onClick={e => _onClickAdmin(anUser.email)}>Admin</button>
                                    <button className="admin-btn admin-btn-autor">Autor</button>
                                    <button className="admin-btn admin-btn-guest">Invitado</button>
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
