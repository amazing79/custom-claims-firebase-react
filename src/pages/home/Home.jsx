import React from 'react'
import {UserContext} from '../../context/UserProvider'

import BooksList from '../books/BooksList'

const Home = () => {

    const { user } = React.useContext(UserContext);

    return (
        <div className="app-container">
            <h2>Bienvenido a Libroracce!</h2>
            <br />
            <BooksList />
            <br />
            { !user.active && (<p>Autenticate para m&aacute;s placer!</p>) }
      </div>
    )
}

export default Home
