import React from 'react'
import {UserContext} from '../../context/UserProvider'

const Home = () => {

    const { user } = React.useContext(UserContext);

    return (
        <div className="app-container">
            <h2>Bienvenido a Libroracce!</h2>
            <br />
            { !user.active && (<p>Autenticate para m&aacute;s placer!</p>) }
      </div>
    )
}

export default Home
