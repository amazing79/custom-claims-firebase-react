import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/config';

export const UserContext = React.createContext();

const UserProvider = (props) => 
{
    const initData = { uid: 0, email: '', pass:'', rol: 'invitado', active: false};

    const [ user, setUser ] = useState(Object.assign({}, initData));
  
    async function initSession(user){
        /*
        1 - seleccionar mentodo de autenticacion
        2 - con el metodo, realizar el login.
        3 - Si es la primera vez que ingresa, crear en nuestra base un registro para ese usuario, con su rol
        3.1 - Si ya existe, solo recupero sus datos
        */
        try {
             const result = await auth.signInWithEmailAndPassword(user.email, user.pass );
             
             const registerUser = await db.collection('usuarios').doc(result.user.email).get();

             if (!registerUser.exists){
                let newUser = { email: result.user.email, uid: result.user.uid, rol:'invitado' , active:true} ;

                await db.collection('usuarios').doc(newUser.email).set(newUser);
                console.log(`Proceso exitoso para el usuario: ${newUser.email}`);
                setUser(newUser);
             }else{
                setUser(registerUser.data());
             }
             
        } catch (error) {
            console.error(`ocurrio el error: ${error}`);
        }
    }

    function closeSession(){
        setUser(initData);
        auth.signOut();
    }
  
    useEffect( () => 
    {
        const detectUser = () => {
            auth.onAuthStateChanged( async(user) => {
                
                let authUser = Object.assign({}, initData);
                if(user){
                    authUser.uid = user.uid;
                    authUser.email = user.email;
                    authUser.active = true;
    
                    let idTokenResult = await user.getIdTokenResult();
                    //console.log(idTokenResult);
                    switch(true){
                        case idTokenResult.claims.isAdmin: 
                            //console.log(`el usuario es re groso`);
                            authUser.rol = 'admin';
                        break;
                        case idTokenResult.claims.isAutor: 
                            //console.log(`el usuario es medio pelo`);
                            authUser.rol = 'autor';
                        break;
                        default:
                            //console.log(`Venis despues de la gente de limpieza pero sos ${authUser.rol}`); 
                    }
                }
                else{
                    authUser.rol = 'no autenticado';
                    //console.log(`Quien te juna, fiera! sos ${authUser.rol}`); 
                }
                setUser(authUser);
            })
        }
        detectUser();
    }
    ,// eslint-disable-next-line
    []);
   
    return (
        <UserContext.Provider value={ { user, initSession, closeSession}} >
            { props.children}
        </UserContext.Provider>
    )
}

export default UserProvider
