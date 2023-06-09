import React from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.png';
import { ReactComponent as HeartIcon } from '../../../../assets/images/heart.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/trash.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/edit.svg';

import './Post.css';
import { Link } from 'react-router-dom';

export const Post = ({
  id, 
  title, 
  description, 
  liked = false, 
  thumbrnail = imagePlaceholder,
  likePost,
  deletePost,
  selectPost
}) => {

  const customFilling = liked ? 'crimson' : 'black';

  const finalDescription = (
    <p>
      {description.length > 100 ? (
        <>
          {description.slice(0, 101)}...          
        </>
      ) : (
        description
      )}
      &nbsp;
      <Link to={`/news/${id}`}>Подробнее</Link>
    </p>
  );

  return (
    <div className='post'>
      <img src={thumbrnail} alt="post" />
      <h2>{title}</h2>
      {finalDescription}
      <div className='actions'>
        <button onClick={likePost} className='likeBtn'>
        <HeartIcon fill={customFilling} />
        </button>
        <button onClick={deletePost} className='deleteBtn'>
          <TrashIcon />
        </button>
        <button onClick={selectPost} className='selectBtn'>
          <EditIcon />
        </button>
      </div>    
    </div>
  );
};