const functions = require('firebase-functions');
//incorporamos modulo admin para acceder a las funciones administrativas
const admin = require('firebase-admin');
admin.initializeApp();
//para trabajar con los modulos de autenticacion
const auth = admin.auth();

exports.agregarAdmin = functions.https.onCall( async (data, context) =>
    {   
        let errors = {};
        
        if(!context.auth.token.isAdmin){
             errors['auth-error'] = 'No cuenta con los permisos'
             return {errors}; 
        } 
        try {
            //obtengo el usuario autenticado
            let user = await auth.getUserByEmail(data.email);

            let rol = await auth.setCustomUserClaims(user.uid, {isAdmin: true});

            return {message: `Se ha creado el usuario admin`}

        } catch (error) {
            errors['modulo-error'] = `Funcion Agregar Admin: ${error} `;
            return {errors};
        }
    }
);

exports.quitarAdmin = functions.https.onCall( async (data, context) =>
    {   
        let errors = {};
        
        if(!context.auth.token.isAdmin){
             errors['auth-error'] = 'No cuenta con los permisos'
             return {errors}; 
        } 
        if (data.email === 'admin@silver-bullet.com.ar'){
            errors['super-user-error'] = 'No se le pueden quitar los permisos al superusuario';
            return {errors}
        }
        
        try {
            //obtengo el usuario autenticado
            let user = await auth.getUserByEmail(data.email);

            let rol = await auth.setCustomUserClaims(user.uid, {isAdmin: false});

            return {message: `Se ha quito el rol admin`}

        } catch (error) {
            errors['modulo-error'] = `Funcion Quitar Admin: ${error} `;
            return {errors};
        }
    }
);

exports.agregarAutor = functions.https.onCall( async (data, context) =>
    {   
        let errors = {};
        
        if(!context.auth.token.isAdmin){
             errors['auth-error'] = 'No cuenta con los permisos'
             return {errors}; 
        } 
        try {
            //obtengo el usuario autenticado
            let user = await auth.getUserByEmail(data.email);

            let rol = await auth.setCustomUserClaims(user.uid, {isAutor: true});

            return {message: `Se ha creado el usuario Autor`}

        } catch (error) {
            errors['modulo-error'] = `Funcion agregar autor: ${error} `;
            return {errors};
        }
    }
);

exports.quitarAutor = functions.https.onCall( async (data, context) =>
    {   
        let errors = {};
        
        if(!context.auth.token.isAdmin){
             errors['auth-error'] = 'No cuenta con los permisos'
             return {errors}; 
        } 
        try {
            //obtengo el usuario autenticado
            let user = await auth.getUserByEmail(data.email);

            let rol = await auth.setCustomUserClaims(user.uid, {isAutor: false});

            return {message: `Se ha quitado el rol Autor`}

        } catch (error) {
            errors['modulo-error'] = `Funcion quitar autor: ${error} `;
            return {errors};
        }
    }
);
