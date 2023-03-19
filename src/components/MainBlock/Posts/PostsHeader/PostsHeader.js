import React, { useState } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import './PostHeader.css';
import { AddForm } from './AddForm/AddForm';

export const PostsHeader = ({ title, spaPosts, setSpaPosts, isLikedPosts}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <section className="postHeader">
      <h1>{title}</h1>
      {!isLikedPosts && (
        <button onClick={() => setShowAddForm(true)} className='showAddFormBtn'>
          Создать пост
        </button> 
      )}
      
      <SearchForm />

      { showAddForm && (
          <AddForm 
            setSpaPosts={setSpaPosts} 
            spaPosts={spaPosts}  
            setShowAddForm={setShowAddForm} /// функция за изменение состояния флажка
          /> 
      )}
    </section>
  );
};