import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../../../assets/images/left-arrow.svg';
import './LogOut.css';

export const LogOut = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  
  const handleLogOut = () => {
    dispatch(LogOut());
    history.push('/login')
  }

  return (
    <section className="sidebarBottom">
      <button onClick={handleLogOut}>
        <ArrowLeftIcon height={25} width={25}/>
        <span>Выход</span>  
      </button>
    </section>
  )
}
