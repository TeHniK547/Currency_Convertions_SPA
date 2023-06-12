import React from 'react';
import './NoMatch.css';

export const NoMatch = () => {
  return (
    <selection class="page_404">
      <div class="container">
        <div class="rom">
          <div class="col-sm-12">
            <div class="col-sm-10 col-sm-offset-1 
            text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center">404</h1>
              </div>
              <div class="content_box_404">
                <h3 class="h2">Ой! Видимо вы потерялись!</h3>
                <p>К сожалению я не знаю такой страницы. Возможно Вы неправильно ввели адрес...</p>
                <a href="/news">Вернуться назад</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </selection>
    // <div>
    //   <h1>Страница не найдена!</h1>
    //   <img src={notFoundIcon} alt='NoMatch'/>
    // </div>
  )
}
