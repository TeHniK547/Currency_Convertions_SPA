import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { POSTS_URL } from '../../utils/constants';
import { useGetSinglePost } from '../../utils/hooks';

import { ReactComponent as HeartIcon } from '../../assets/images/heart.svg';
import { ReactComponent as TrashIcon } from '../../assets/images/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from '../../store/slices/posts';
import { EditForm } from '../../components/EditForm/EditForm';

export const SpaPostPage = ({ setSpaPosts }) => {

  const { postId } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const { spaPost, setSpaPost, isLoading, error } = useGetSinglePost(POSTS_URL, postId);

  const [showEditForm, setShowEditForm] = useState(false);

  const { title, description,  thumbrnail, liked } = spaPost;
    
  if (isLoading) return <h1>Получаем данные...</h1>

  if (error) return <h1>{error.message}</h1>;
  
  const handleLikePost = () => {
    const updatedPost = {...spaPost, liked: !spaPost.liked };

    dispatch(editPost(updatedPost))
      .then(() => {
        setSpaPost(updatedPost);
      })
  };

  const handleDeletePost = (postId) => {
    const isDelete = window.confirm('Удалить пост?');
        
    if (isDelete) {
      dispatch(deletePost(postId))
        .then(() => history.goBack())
    }
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
        <button onClick={handleLikePost} className='likeBtn'>
            <HeartIcon fill={customFilling} />
        </button>
        <button onClick={handleDeletePost} className='deleteBtn'>
            <TrashIcon />
        </button>
        <button onClick={handleEditFormShow} className='selectBtn'>
            <EditIcon />
        </button>
      </div>

      {showEditForm && (
        <EditForm 
          setShowEditForm={setShowEditForm}
          selectedPost={spaPost}
        />
      )}

    </div>
  )
}
