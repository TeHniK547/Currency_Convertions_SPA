import React from 'react';
import './Navigation.css';

import newsIcon from '../../../../assets/images/news.png';
import moneyIcon from '../../../../assets/images/kurs.png';
import settingsIcon from '../../../../assets/images/settings.png';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink exact to='/news' activeClassName='active'>
        <img src={newsIcon} alt='News' />
        <span>News</span>
      </NavLink>
      <NavLink exact to='/favourite' activeClassName='active'>
        <img src={moneyIcon} alt='Favourite'/>
        <span>Favourite</span>
      </NavLink>
      <NavLink exact to='/currency' activeClassName='active'>
        <img src={moneyIcon} alt='Currency'/>
        <span>Currency</span>
      </NavLink>
      <NavLink exact to='/:id' activeClassName='active'>
        <img src={moneyIcon} alt='UserPage'/>
        <span>UserPage</span>
      </NavLink>
      <NavLink exact to='/settings' activeClassName='active'>
        <img src={settingsIcon} alt='Settings'/>
        <span>Settings</span>
      </NavLink>
    </nav>
  )
}
