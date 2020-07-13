import React from 'react';
//pages
import NavBar from './commons/Navbar'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import Books from './pages/books/Books'
import Login from './pages/login/Login'
import Actions from './commons/utils/actions'

function App() {

  const [ actualAction , setActualAction ] = React.useState(Actions.SHOW_HOME);

  switch (actualAction){
    case Actions.SHOW_LOGIN:
      return(
        <div >
          <NavBar setAction={setActualAction}/>
          <Login setAction={setActualAction}/>
        </div>
      )
    case Actions.SHOW_ADMIN:
      return(
        <div >
        <NavBar setAction={setActualAction}/>
        <Admin />
      </div>
      )
    case Actions.SHOW_BOOKS:
      return(
          <div >
          <NavBar setAction={setActualAction}/>
          <Books setAction={setActualAction}/>
        </div>
        )
    case Actions.SHOW_HOME:
    case Actions.EXIT_APP:
    default:
      return (
        <div>
          <NavBar setAction={setActualAction}/>
          <Home />
        </div>
      )
     
  }
}

export default App;
