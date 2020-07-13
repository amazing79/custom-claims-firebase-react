import React from 'react'
import {UserContext} from '../../context/UserProvider'

const Login = () => {

    const userNachi = {uid: 0, email: 'ignacioja@hotmail.com', pass:'gueraike', active: false};
    const userHaniball = {uid: 0, email: 'haniballector@yahoo.com', pass:'vivalacarne123', active: false};
    const userAdmin = {uid: 0, email: 'admin@silver-bullet.com.ar', pass:'admin123', active: false};

    const { initSession } = React.useContext(UserContext);

    function _onClickLogin(e, user){
        e.preventDefault();
        initSession(user);
    }

    return (
        <div className="app-container">
            <form action="">
                <h2>Formulario de Login, que miedda</h2>
                <button onClick={e => _onClickLogin(e, userNachi)}>Ingresar Nachis</button>
                <br />
                <button onClick={e => _onClickLogin(e, userHaniball)}>Ingresar Hanibal</button>
                <br />
                <button onClick={e => _onClickLogin(e, userAdmin)}>Ingresar Admin</button>
            </form>
        </div>
    )
}

export default Login
