import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { POSTS_URL } from '../../utils/constants';
import { useGetSinglePost } from '../../utils/hooks';

import { ReactComponent as HeartIcon } from '../../assets/images/heart.svg';
import { ReactComponent as TrashIcon } from '../../assets/images/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';
import { EditForm } from './EditForm/EditForm';

export const SpaPostPage = ({ setSpaPosts }) => {

  const { postId } = useParams();

  const history = useHistory();

  const { spaPost, setSpaPost, isLoading, error } = useGetSinglePost(POSTS_URL, postId);

  const [showEditForm, setShowEditForm] = useState(false);

  const { title, description,  thumbrnail, liked } = spaPost;
    
  if (isLoading) return <h1>Получаем данные...</h1>

  if (error) return <h1>{error.message}</h1>;
  
  const likePost = () => {
    const updatedPost = {...spaPost, liked: !spaPost.liked };
      fetch(POSTS_URL + postId, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
        })
        .then((res) => res.json())
        .then((updatedPostsFromServer) => {
          setSpaPost(updatedPostsFromServer);
          setSpaPosts((spaPosts) => {
            return spaPosts.map(post => {
              if (post.id === updatedPostsFromServer.id) {
                return updatedPostsFromServer
              }

              return post
            })
          });
        })
        .catch((error) => console.log(error))
    };

    const deletePost = (postId) => {
      const isDelete = window.confirm('Удалить пост?');
        
      if (isDelete) {
        fetch(POSTS_URL + postId, { method: 'DELETE' })
          .then(() => {
            setSpaPosts((spaPosts) => spaPosts.filter((post) => post.id !== postId))
            history.goBack();
          })
          .catch((error) => console.log(error));
      };
    };
    
      /// редактирование поста
    const handleEditFormShow = (post) => setShowEditForm(true)
    

    const customFilling = liked ? 'crimson' : 'black';
    
  return (
    <div className='post'>
      <img src={thumbrnail} alt="post" />
      <h2>{title}</h2>
      {description}
      <div className='actions'>
        <button onClick={likePost} className='likeBtn'>
            <HeartIcon fill={customFilling} />
        </button>
        <button onClick={deletePost} className='deleteBtn'>
            <TrashIcon />
        </button>
        <button onClick={handleEditFormShow} className='selectBtn'>
            <EditIcon />
        </button>
      </div>

      {showEditForm && (
        <EditForm 
          setShowEditForm={setShowEditForm}
          setSpaPost={setSpaPost}
          spaPost={spaPost}
          setSpaPosts={setSpaPosts}
        />
      )}

    </div>
  )
}
