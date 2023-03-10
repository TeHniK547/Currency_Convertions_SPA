import { useState } from 'react';
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainBlock } from './components/MainBlock/MainBlock';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  return (
    <div className="App">
      {
        isLoggedIn ? ( 
          <MainBlock setIsLoggedIn={setIsLoggedIn} /> 
        ) : (
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        )
      }
    </div>
  );
}

export default App;
