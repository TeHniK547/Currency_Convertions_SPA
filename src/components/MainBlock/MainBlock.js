import { Posts } from "./Posts/Posts"
import { SideBar } from "./SideBar/SideBar"

import './MainBlock.css'
import { Redirect, Route, Switch } from "react-router-dom"
import { Favourite } from "../../pages/LoginPage/Favoutite/Favorite"
import { SpaPostPage } from "../../pages/SpaPostPage/SpaPostPage"
import { Currency } from "../../pages/LoginPage/Currency/Currency"
import { Settings } from "../../pages/LoginPage/Settings/Settings"
import { UserPage } from "../../pages/UserPage/UserPage"

export const MainBlock = ({ postsData }) => {

  return(
    <>
      <SideBar />
      <main className="mainBlock">
        <Switch>
          <Route exact path='/news'>
            <Posts title="Posts" {...postsData} />
          </Route>
           <Route exact path='/favourite' component={Favourite}>
            <Posts title="Favourite posts" {...postsData} isLikedPosts />
          </Route>
          <Route path='/news/:postId'>
            <SpaPostPage setSpaPosts={postsData.setSpaPosts}/> 
          </Route>
          <Route exact path='/'>
            <Redirect to='/news' />
          </Route>
          
          <Route exact path='/currency' component={Currency} />
          <Route exact path='/settings' component={Settings} />    
          <Route path="/:id" component={UserPage} />
        </Switch>
      </main>
    </>
  );
};