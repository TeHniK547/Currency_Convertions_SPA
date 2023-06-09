import './Posts.css'
import { Post } from './Post/Post';
import { PostsHeader } from './PostsHeader/PostsHeader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  deletePost, 
  editPost, 
  fetchPosts, 
  selectPostsData } from '../../../store/slices/posts';
import { EditForm } from '../../EditForm/EditForm';

export const Posts = () => {

  // const likedPosts = spaPosts.filter((post) => post.liked);
  
  const { list: posts, isLoading, error } = useSelector(selectPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  const handleLikePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = {...updatedPosts[index], liked: !updatedPosts[index].liked };
    
    dispatch(editPost(updatedPosts[index]));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId))
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
        title={'Posts'}
        isLikedPosts={false} 
        spaPosts={posts} 
      />
      
      <section className='posts'>
        {posts.map((post, pos) => {
          return (
            <Post
              {...post}
              title={post.title}
              description={post.description}
              liked={post.liked}/* флаг на пост лайкнут или нет*/
              thumbrnail={post.thumbrnail}
              likePost={() => handleLikePost(pos)}
              deletePost={() => handleDeletePost(post)}
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
        />
      )}
    </div>
  );
};
