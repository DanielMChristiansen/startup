import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthState } from './authState';

function Header( {currentAuthState, setCurrentAuthState} ) {
    const navigate = useNavigate();
    const location = useLocation();
    React.useEffect(() => {
        fetch('/api/authenticated')
            .then(response => {
                if (response.status === 401) {
                    setCurrentAuthState(AuthState.Unauthenticated);
                } else {
                    setCurrentAuthState(AuthState.Authenticated);
                }
            }).catch(() => {
                alert("Failed to reach server");
            });
    }, []);
    function logout() {
        fetch('/api/logout', { method: 'POST' })
            .then(() => {
                setCurrentAuthState(AuthState.Unauthenticated);
            });
        navigate('/');
    }
    return (
      <header>
          <nav>
            
              <a href="#"><img src="calendar.png" alt="" />Schedulify</a>
              <menu>
                  <li>{
                    (currentAuthState !== AuthState.Authenticated) 
                    ? (<NavLink className={location.pathname === '/' ? "currPage" : ""} to="/">Login</NavLink>)
                    : (<NavLink onClick={logout} to="/">Logout</NavLink>)
                    }
                  </li>
                  {currentAuthState === AuthState.Authenticated && (<li><NavLink className={location.pathname === '/quickviewPage' ? "currPage" : ""} to="/quickviewPage">Quickview</NavLink></li>)}
                  {currentAuthState === AuthState.Authenticated && (<li><NavLink className={location.pathname === '/setupPage' ? "currPage" : ""} to="/setupPage">Setup</NavLink></li>)}
                  {currentAuthState === AuthState.Authenticated && (<li><NavLink className={location.pathname === '/tutorialPage' ? "currPage" : ""} to="/tutorialPage">Tutorial</NavLink></li>)}
              </menu>
          </nav>
      </header>
    )
}

export default Header;