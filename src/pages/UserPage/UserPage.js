import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './UserPage.css';

export const UserPage = () => {
  const initValues = {
    userName: '',
    userSurname: '',
    userPatronymic: '',
    userLogin: '',
    userEmail: '',

  }

  const [setUserData] = useState = useState(initValues);

  // console.log('userData: ', userData)

    let { id } = useParams();
  return (
    <div className='wrapper'>
      <div className='wrapper-content'>
      <h1>Hello there user {id}</h1>
      <p>This is your awesome User Profile page</p>
        <div className='tabl-data'>
          <table>
            <th>#</th>
            <th>login</th>
            <th>User SurName</th>
            <th>User Name</th>
            <th>User Patronymic</th>
            <th>E-mail</th>
            <th>User Password</th>
            <th>Change Password</th>
            <th>Actions</th>
            <tbody>

            </tbody>
          </table>
        </div>
        <div>
          <form>
            <input placeholder='Введите свое имя' onChange={(event) => setUserData((prevState) => ({
              ...prevState,
              userName: event.target.value
            }))} />

            <input placeholder='Введите свою фамилию' onChange={(event) => setUserData((prevState) => ({
              ...prevState,
              userSurname: event.target.value
            }))} />

            <input placeholder='Введите свое отчество' onChange={(event) => setUserData((prevState) => ({
              ...prevState,
              userPatronymic: event.target.value
            }))} />

            <input placeholder='Введите свой логин' onChange={(event) => setUserData((prevState) => ({
              ...prevState,
              userLogin: event.target.value
            }))} />

            <input placeholder='Введите свой e-mail' onChange={(event) => setUserData((prevState) => ({
              ...prevState,
              userEmail: event.target.value
            }))} />

            <input placeholder='Создайте свой пароль' />
            <input placeholder='Повторите пароль' />
            
            <div className='buttons-wrapper'>
              <button type='reset'>Clean</button>
              <button type='submit'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


