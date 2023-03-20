import { Posts } from "./Posts/Posts"
import { SideBar } from "./SideBar/SideBar"

import './MainBlock.css'
import { Redirect, Route, Switch } from "react-router-dom"
import { Favourite } from "../../pages/LoginPage/Favoutite/Favorite"
import { useFetchPosts } from "../../utils/hooks"
import { POSTS_URL } from "../../utils/constants";
import { NoMatch } from "../../pages/NoMatch/NoMatch"

export const MainBlock = ({setIsLoggedIn, isLoggedIn}) => {
    const postsData = useFetchPosts(POSTS_URL);

    return(
        <>
            <SideBar setIsLoggedIn={setIsLoggedIn} />
            <main className="mainBlock">
                <Switch>
                    <Route path='/news'>
                        <Posts title="Posts" {...postsData} />
                    </Route>
                    <Route path="/favourite" component={Favourite}>
                        <Posts title="Favourite posts" {...postsData} isLikedPosts />
                    </Route> 
                    <Route exact path='/'>
                        <Redirect to='/news' />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </main>
        </>
    );
};