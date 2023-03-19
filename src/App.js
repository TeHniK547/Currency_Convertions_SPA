import { useState } from 'react';
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainBlock } from './components/MainBlock/MainBlock';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  return (
    <div className="App">
      <Switch>
      <Route exact path='/'>
        {isLoggedIn ? <Redirect to='/news' /> : <Redirect to='/login' />}
      </Route>

        <Route
          exact 
          path='/login' 
          render={(props) => {
            if (isLoggedIn) return <Redirect to="/" />
            return <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />
          }}
        />
        
        <Route path='/'>
          {isLoggedIn ? (
            <MainBlock setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
