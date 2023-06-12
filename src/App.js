import { useState } from 'react';
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainBlock } from './components/MainBlock/MainBlock';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { useFetchPosts } from './utils/hooks';
import { POSTS_URL } from './utils/constants';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const postsData = useFetchPosts(POSTS_URL);

  const spaPostRoutes = postsData?.spaPosts.map((post) => {
    return `/news/${post.id}`;
  });

  return (
    <div className="App">
      <Switch>
        <PublicRoute 
          exact 
          path='/login' 
          isLoggedIn={isLoggedIn} 
          spaPostRoutes={spaPostRoutes}>
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        </PublicRoute>

        <PrivateRoute 
          path='/' 
          isLoggedIn={isLoggedIn} 
          spaPostRoutes={spaPostRoutes}
        >
          <MainBlock setIsLoggedIn={setIsLoggedIn} postsData={postsData}/>
        </PrivateRoute>

      </Switch>
    </div>
  );
};

export default App;
