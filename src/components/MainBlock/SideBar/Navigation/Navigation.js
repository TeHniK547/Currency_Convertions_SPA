import React from 'react';
import './Navigation.css';

import newsIcon from '../../../../assets/images/news.png';
import moneyIcon from '../../../../assets/images/kurs.png';
import settingsIcon from '../../../../assets/images/settings.png';

export const Navigation = () => {
  return (
    <nav className="nav">
      <a href='/' className='active'>
        <img src={newsIcon} alt='News' />
        <span>News</span>
      </a>
      <a href='/'>
        <img src={moneyIcon} alt='Kurs'/>
        <span>Kurs</span>
      </a>
      <a href='/'>
        <img src={settingsIcon} alt='Settings'/>
        <span>Settings</span>
      </a>
    </nav>
  )
}
