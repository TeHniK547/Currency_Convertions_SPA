import React, { useEffect, useState } from 'react';
import { PostsHeader } from './PostsHeader/PostsHeader';
import './Posts.css'
import { Post } from './Post/Post';
import { POSTS, POSTS_URL } from '../../../utils/constants'
import { setPostsToLocalStorage } from '../../../utils/helpers'
import { EditForm } from './EditForm/EditForm';

export const Posts = () => {

  const [spaPosts, setSpaPosts] = useState(
    JSON.parse(localStorage.getItem('spaPosts')) || POSTS
  );

  
  useEffect(() => {
    fetch(POSTS_URL)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  
  const likePost = (pos) => {
    const updatePosts = [...spaPosts];
    
    updatePosts[pos].liked = !updatePosts[pos].liked;

    setPostsToLocalStorage(updatePosts)
    setSpaPosts(updatePosts)
  }

  const deletePost = (postId) => {
    const isDelete = window.confirm('Удалить пост?');
    if (isDelete) {
      const updatePosts = spaPosts.filter((post) => {
        return post.id !== postId
      });

      setPostsToLocalStorage(updatePosts)
      setSpaPosts(updatePosts);
    }
  };

  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const selectPost = (pos) => {
    setSelectedPost(spaPosts[pos]);
    setShowEditForm(true);
  };

  return (
    <div className='postsWrapper'>
      <PostsHeader setSpaPosts={ setSpaPosts } spaPosts={spaPosts} />
      
      <section className='posts'>
        {spaPosts.map((post, pos) => {
          return (
            <Post
              title={post.title}
              description={post.description}
              liked={post.liked}/* флаг на пост лайкнут или нет*/
              image={post.image}
              likePost={() => likePost(pos)}
              deletePost={() => deletePost(post.id)}
              selectPost={() => selectPost(pos)}
              key={post.id}
            />
          )
          })
        }
      </section>

      {showEditForm && (
        <EditForm 
          selectedPost={selectedPost} 
          setShowEditForm={setShowEditForm}
          setSpaPosts={setSpaPosts}
          spaPosts={spaPosts}
        />
      )}
    </div>
  );
};
