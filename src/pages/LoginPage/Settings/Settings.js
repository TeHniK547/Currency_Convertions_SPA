import React from 'react'

export const Settings = () => {
  return (
    <div >
      Settings
      <div className='wrapper'>
        <form action="#">
          <div class="profile">
            <p>Логин</p>
            <input type="text" defaultValue={''} />
            <p>Фамилия</p>
            <input type="text" defaultValue={''} />
            
            <p>Имя</p>
            <input type="text" defaultValue={''} />
            <p>Отчество</p>
            <input type="text" defaultValue={''} />
            <p>email</p>
            <input type="text" defaultValue={''} />
          </div>
          
          <div className='ок'>Getting exchange rate...</div>
          <button>Get Exchange Rate</button>
        </form>
        <script src="../../../country-list.js"></script>
        <script src="script.js"></script>
      </div>
    </div>
  )
}
