import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainBlock } from './components/MainBlock/MainBlock';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { useFetchPosts } from './utils/hooks';
import { POSTS_URL } from './utils/constants';

function App() {
  const postsData = useFetchPosts(POSTS_URL);

  const spaPostRoutes = postsData?.spaPosts.map((post) => {
    return `/news/${post.id}`;
  });
    
  return (
    <div className='App'>
      <Switch>
        <PublicRoute exact path='/login' spaPostRoutes={spaPostRoutes}>
          <LoginPage />
        </PublicRoute>

        <PrivateRoute path='/' spaPostRoutes={spaPostRoutes}>
          <MainBlock postsData={postsData}/>
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default App;
