import React from 'react'
import './Login.css'
import {UserContext} from '../../context/UserProvider'


const Login = () => {

    const userNachi = {uid: 0, email: 'ignacioja@hotmail.com', pass:'milanesa123', active: false};
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
                <h2>Selecciona una tacuen!</h2>
                <ul className="login-list">
                    <li className="login-list_item">
                        <button className="login-list-btn" onClick={e => _onClickLogin(e, userNachi)}>Ingresar Nachis</button>
                    </li>
                    <li className="login-list_item">
                        <button className="login-list-btn" onClick={e => _onClickLogin(e, userHaniball)}>Ingresar Hanibal</button>
                    </li>
                    <li className="login-list_item">
                        <button className="login-list-btn" onClick={e => _onClickLogin(e, userAdmin)}>Ingresar Admin</button>
                    </li>
                </ul>

            </form>
        </div>
    )
}

export default Login
