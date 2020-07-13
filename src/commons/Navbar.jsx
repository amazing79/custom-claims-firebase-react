import React from 'react'
import './Navbar.css'
import {UserContext} from '../context/UserProvider';

import Actions from './utils/actions'

const Navbar = ({setAction}) => {

    const { user,closeSession } = React.useContext(UserContext);

    function _onClickSetAction(action){
        setAction(action);
        if (action === Actions.EXIT_APP){
            closeSession();
        }

    }

    return (
        <nav className="nav-container">
            <div className="app-container">
            <ul className="nav-menu">
                <li className="nav-menu-item"><button className="nav-btn" onClick={e => _onClickSetAction(Actions.SHOW_HOME)}>Home</button></li>
                { !user.active ? (<li className="nav-menu-item nav-btn-right"><button className="nav-btn" onClick={e => _onClickSetAction(Actions.SHOW_LOGIN)}>Login</button></li>)
                  :(<>
                    <li className="nav-menu-item"><button className="nav-btn" onClick={e => _onClickSetAction(Actions.SHOW_ADMIN)}>Admin</button></li>
                    <li className="nav-menu-item"><button className="nav-btn" onClick={e => _onClickSetAction(Actions.SHOW_BOOKS)}>Books</button></li>
                    <li className="nav-menu-item nav-btn-right"><button className="nav-btn" onClick={e => _onClickSetAction(Actions.EXIT_APP)}>Exit</button></li>
                    </>
                  )
                }
                
            </ul>
            </div>

        </nav>
    )
}

export default Navbar
