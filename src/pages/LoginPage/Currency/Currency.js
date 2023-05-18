import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Currency = () => {
  const [curreincies, setCurrencies] = useState([]);
  const [firstCountInput, setFirstCountInput] = useState(100);
  const [firstCur, setFirstCur] = useState('BYN');
  const [firstCount, setFirstCount] = useState(100);
  const [secondCur, setSecondCur] = useState('BYN');
  const [secondCount, setSecondCount] = useState(100);
  const [secondCountInput, setSecondCountInput] = useState(100);

  useEffect(() => {
    axios.get('https://www.nbrb.by/api/exrates/currencies').then(response => {
      if (response.status === 200) {
        setCurrencies([{
          CurId: 0,
          CurName: 'BYN'
        }, ...response.data.map(cur => {
          return {
            CurId: cur.Cur_ID,
            CurName: cur.Cur_Abbreviation
          }
        })])
      }
    });
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  }, [])

//
  const calculateFromFirst = () => {
    setFirstCount(firstCountInput);//кол-во валюты которые ввели с клаввы записывается в переменную firstCount
    if (firstCur === secondCur)
      return setSecondCount(firstCountInput);//приравнивает кол-во валюты, если они совпадают и выходит из функции
    if (firstCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setSecondCount(firstCountInput / response.data.Cur_OfficialRate * response.data.Cur_Scale) // подсчет валюты если первая валюта BYN
          }
        })
      return;
    }
    if (secondCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setSecondCount(firstCountInput * response.data.Cur_OfficialRate / response.data.Cur_Scale)// подсчет валюты если ВТАРАЯ валюта BYN
          }
        })
      return;
    }
    axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
      .then((response1) => {
        if (response1.status === 200) {
          axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
            .then(response2 => {
              setSecondCount(firstCountInput * response1.data.Cur_OfficialRate / response1.data.Cur_Scale / response2.data.Cur_OfficialRate * response2.data.Cur_Scale);
            })// ПОДСЧЕТ ЕСЛИ ОБА НЕ BYN 
        }
      })
  }

  const calculateWhenFirstChangeCur = () => {
    if (firstCur === secondCur)
      return setSecondCount(firstCount);
    if (secondCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setSecondCount(firstCount / response.data.Cur_OfficialRate * response.data.Cur_Scale)
          }
        })
      return;
    }
    if (firstCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setSecondCount(firstCount * response.data.Cur_OfficialRate / response.data.Cur_Scale)
          }
        })
      return;
    }
    axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
      .then((response1) => {
        if (response1.status === 200) {
          axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
            .then(response2 => {
              setSecondCount(firstCount * response1.data.Cur_OfficialRate / response1.data.Cur_Scale / response2.data.Cur_OfficialRate * response2.data.Cur_Scale);
            })
        }
      })
  } //подсчет ко-во валюты при выборе другой валюты


  const calculateFromSecond = () => {
    setSecondCount(secondCountInput);
    if (firstCur === secondCur)
      return setFirstCount(secondCountInput);
    if (secondCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setFirstCount(secondCountInput / response.data.Cur_OfficialRate * response.data.Cur_Scale)
          }
        })
      return;
    }
    if (firstCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setFirstCount(secondCountInput * response.data.Cur_OfficialRate / response.data.Cur_Scale)
          }
        })
      return;
    }
    axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
      .then((response1) => {
        if (response1.status === 200) {
          axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
            .then(response2 => {
              setFirstCount(secondCountInput * response1.data.Cur_OfficialRate / response1.data.Cur_Scale / response2.data.Cur_OfficialRate * response2.data.Cur_Scale);
            })
        }
      })
  }; //зеркальные подсчеты валют как выше описано справа

  const calculateWhenSecondChangeCur = () => {
    if (firstCur === secondCur)
      return setFirstCount(secondCount);
    if (secondCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setFirstCount(secondCount / response.data.Cur_OfficialRate * response.data.Cur_Scale)
          }
        })
      return;
    }
    if (firstCur === 'BYN') {
      axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
        .then(response => {
          if (response.status === 200) {
            setFirstCount(secondCount * response.data.Cur_OfficialRate / response.data.Cur_Scale)
          }
        })
      return;
    }
    axios.get('https://www.nbrb.by/api/exrates/rates/' + firstCur.toString() + '?parammode=2')
      .then((response1) => {
        if (response1.status === 200) {
          axios.get('https://www.nbrb.by/api/exrates/rates/' + secondCur.toString() + '?parammode=2')
          .then(response2 => {
            setFirstCount(secondCount * response1.data.Cur_OfficialRate / response1.data.Cur_Scale / response2.data.Cur_OfficialRate * response2.data.Cur_Scale);
          })
        }
      })
    }
    
//вызывает функцию calculateFromSecond при ручном вводе кол-во первой валюты (левый input)
  useEffect(() => calculateFromSecond(), [secondCountInput]);
  //вызывает функцию calculateWhenFirstChangeCur при выборе первой валюты (левый select)
  useEffect(() => calculateWhenFirstChangeCur(), [firstCur]);
  //вызывает функцию calculateFromFirst при ручном вводе кол-во второй валюты (правый input)
  useEffect(() => calculateFromFirst(), [firstCountInput]);
  //вызывает функцию calculateWhenSecondChangeCur при выборе второй валюты (правый select)
  useEffect(() => calculateWhenSecondChangeCur(), [secondCur]);

  return (

    <div class="currencies-side">
      <h1>Конвертер валют онлайн</h1>
      <div class="curreincies-date">Официальные курсы валют НБРБ на 13.02.2023 </div>
      <table class="table">
        <tbody id="data"></tbody>
      </table>
{/*первый select выбора валют*/}
      <select value={firstCur} onChange={(event) => { setFirstCur(event.target.value); }}>
        {
          curreincies?.map((cur, index) => <option key={index} value={cur.CurName} label={cur.CurName} />)
        }
      </select>
{/*первый input кол-во валют*/}
      <input type='number' value={firstCount} onChange={(e) => { setFirstCountInput(e.target.value); }}></input>

{/*второй select выбора валют*/}
      <select value={secondCur} onChange={(event) => { setSecondCur(event.target.value); }}>
        {
          curreincies?.map((cur, index) => <option key={index} value={cur.CurName} label={cur.CurName} />)
        }
      </select>
{/*второй input кол-во валют*/}
      <input type='number' value={secondCount} onChange={(e) => { setSecondCountInput(e.target.value); }}></input>


      {/* <div class="row">
        <div class="col-10 col-md-5">
          <div class="currencies-converter">
            <div class="currency-picker js-currency-picker js-currency-picker-from js-currency-calc">
              <div class="currency-picker__img">
                <img src="https://neg.by/upload/medialibrary/163/kps71ng9evd4d80c0kepchjoc208eeyq.png" alt=''/>
              </div>
              <div class="currency-picker__title">BYN</div>
              <div class="currency-picker__trigger"></div>
              <ul class="currencies-list">

                <li class="currencies-list__item js-currency-calc-item js-currency-from  " data-scale="1" data-rate="2.7632" data-curr="USD">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/uf/f51/f5122fa2745804695ae673d418b1539b.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">USD</span>
                </li>
                <li class="currencies-list__item js-currency-calc-item js-currency-from  " data-scale="1" data-rate="2.9588" data-curr="EUR">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/uf/438/43820775b1c39855477e5581f7055076.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">EUR</span>
                </li>
                <li class="currencies-list__item js-currency-calc-item js-currency-from  " data-scale="100" data-rate="3.8012" data-curr="RUB">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/uf/254/254e0b749553ce14a3812b432a6c5875.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">RUB</span>
                </li>
                <li class="currencies-list__item js-currency-calc-item js-currency-from selected " data-scale="1" data-rate="1" data-curr="BYN">
                  ::before
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/medialibrary/163/kps71ng9evd4d80c0kepchjoc208eeyq.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">BYN</span>
                </li>

              </ul>
            </div>
            <div class="form-group currency-input">
              <input 
                class="form-control js-input-from" 
                type="number" 
                id="ID8252261496" 
                name="NAME8252261496" 
                placeholder=" " 
                data-bv-notempty-message="Обязательное поле" 
                data-bv-regexp-message="Неверный формат" 
                data-bv-emailaddress-message=" " 
              />

                <button class="button-clear"></button>
            </div>
          </div>
        </div>
        <div class="col-10 col-md-5">
          <div class="currencies-converter">
            <div class="currency-picker js-currency-picker js-currency-picker-to js-currency-calc">
              <div class="currency-picker__img">
                <img src="https://neg.by/upload/uf/f51/f5122fa2745804695ae673d418b1539b.png" alt=''/>

              </div>
              <div class="currency-picker__title">USD</div>
              <div class="currency-picker__trigger"></div>

              <ul class="currencies-list">

                <li class="currencies-list__item js-currency-calc-item js-currency-to " data-scale="1" data-rate="2.7632" data-curr="USD">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/uf/f51/f5122fa2745804695ae673d418b1539b.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">USD</span>
                </li>
                <li class="currencies-list__item js-currency-calc-item js-currency-to" data-scale="1" data-rate="2.9588" data-curr="EUR">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/uf/438/43820775b1c39855477e5581f7055076.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">EUR</span>
                </li>
                <li class="currencies-list__item js-currency-calc-item js-currency-to" data-scale="100" data-rate="3.8012" data-curr="RUB">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/uf/254/254e0b749553ce14a3812b432a6c5875.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">RUB</span>
                </li>
                
                <li class="currencies-list__item js-currency-calc-item js-currency-to" data-scale="1" data-rate="1" data-curr="BYN">
                  <span class="currencies-list__item-img">
                    <img src="https://neg.by/upload/medialibrary/163/kps71ng9evd4d80c0kepchjoc208eeyq.png" alt=''/>
                  </span>
                  <span class="currencies-list__item-title">BYN</span>
                </li>
              </ul>
            </div>
            <div class="form-group currency-input">
              <input 
                class="form-control js-input-to" 
                type="number" 
                id="ID8641867620" 
                name="NAME8641867620" 
                placeholder=" " 
                data-bv-notempty-message="Обязательное поле" 
                data-bv-regexp-message="Неверный формат" 
                data-bv-emailaddress-message=" "
              />

              <button class="button-clear"></button>
            </div>
          </div>
        </div>

      </div> */}
    </div>

    // <div class="wrapper">

    //   <form action="#">
    //     <div class="amount">
    //       <p>Введите сумму</p>
    //       <input type="text" value="1" />
    //     </div>
    //     <div class="drop-list">
    //       <div class="from">
    //         <p>From</p>
    //         <div class="select-box">
    //           <img src="https://www.countryflags.io/us/flat/48.png" alt="flag" />

    //         </div>
    //       </div>
    //       <div class="icon"><i class="fas fa-exchange-alt"></i></div>
    //       <div class="to">
    //         <p>To</p>
    //         <div class="select-box">
    //           <img src="https://www.countryflags.io/np/flat/48.png" alt="flag" />

    //         </div>
    //       </div>
    //     </div>
    //     <div class="exchange-rate">Getting exchange rate...</div>
    //     <button>Get Exchange Rate</button>
    //   </form>
    //   <script src="../../../country-list.js"></script>
    //   <script src="script.js"></script>
    // </div>
  )
}

