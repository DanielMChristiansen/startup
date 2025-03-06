import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
      <header>
          <nav>
              <a href="#">Schedulify</a>
              <menu>
                  <li><NavLink className="currPage" to="/">Login</NavLink></li>
                  <li><NavLink to="/ataglancePage">At a Glance</NavLink></li>
                  <li><NavLink to="/setupPage">Setup</NavLink></li>
                  <li><NavLink to="/tutorialPage">Tutorial</NavLink></li>
              </menu>
          </nav>
      </header>
    )
}

export default Header;