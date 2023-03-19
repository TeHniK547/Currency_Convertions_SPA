import './Posts.css'
import { Post } from './Post/Post';
import { POSTS_URL } from '../../../utils/constants'
import { PostsHeader } from './PostsHeader/PostsHeader';
import { EditForm } from './EditForm/EditForm';
import { useState } from 'react';

export const Posts = ({ 
  title,
  spaPosts,
  setSpaPosts,
  isLoading,
  error,
  isLikedPosts = false
 }) => {

  const likedPosts = spaPosts.filter((post) => post.liked);
  
  const likePost = (pos) => {
    const updatedPosts = [...spaPosts];

    updatedPosts[pos].liked = !updatedPosts[pos].liked;

    fetch(POSTS_URL + updatedPosts[pos].id, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPosts[pos])
     })
      .then((res) => res.json())
      .then((updatedPostsFromServer) => {
        updatedPosts[pos] = updatedPostsFromServer;
        setSpaPosts(updatedPosts);
      })
      .catch((error) => console.log(error))
  };

  const deletePost = (postId) => {
    const isDelete = window.confirm('Удалить пост?');
    
    if (isDelete) {
      fetch(POSTS_URL + postId, { method: 'DELETE' })
        .then(() => setSpaPosts(spaPosts.filter(post => post.id !== postId)))
        .catch((error) => console.log(error))
    };
  };

  const [selectedPost, setSelectedPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  /// редактирование поста
  const selectPost = (post) => {
    setSelectedPost(post);
    setShowEditForm(true);
  };

  if (isLoading) return <h1>Получаем данные...</h1>

  if (error) return <h1>{error.message}</h1>;

  return (
    <div className='postsWrapper'>
      <PostsHeader 
        title={title}
        isLikedPosts={isLikedPosts} 
        setSpaPosts={ setSpaPosts } 
        spaPosts={spaPosts} 
      />
      
      <section className='posts'>
        {(isLikedPosts ? likedPosts : spaPosts).map((post, pos) => {
          return (
            <Post
              title={post.title}
              description={post.description}
              liked={post.liked}/* флаг на пост лайкнут или нет*/
              thumbrnail={post.thumbrnail}
              likePost={() => likePost(pos)}
              deletePost={() => deletePost(post.id)}
              selectPost={() => selectPost(post)}
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
