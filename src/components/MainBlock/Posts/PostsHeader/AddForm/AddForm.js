import React, { useState } from 'react'; 
import './AddForm.css';
import { ReactComponent as CloseIcon } from '../../../../../assets/images/close.svg';
import { setPostsToLocalStorage } from '../../../../../utils/helpers';
import postImage from '../../../../../assets/images/postImage.jpg';

export const AddForm = ({ setShowAddForm, spaPosts, setSpaPosts }) => {

    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState(''); 

    const handlerPostTitleChange = (e) => {
        setPostTitle(e.target.value)
    }

    const handlePostDescChange = (e) => {
        setPostDesc(e.target.value)
    }

    const createPost = (e) => {
        e.preventDefault();

        const newPost = {
            id: spaPosts.lenght + 1,
            title: postTitle,
            description: postDesc,
            liked: false,
            image: postImage,
        }

        const updatedPosts = [...spaPosts, newPost];

        setSpaPosts(updatedPosts);
        setPostsToLocalStorage(updatedPosts)
        setShowAddForm(false);
    }

    return (
        <>
            <form className='addPostForm' onSubmit={createPost}>
                <button className='hideBtn' onClick={() => setShowAddForm(false)}>
                    <CloseIcon />
                </button>
                <h2>Создать пост</h2>
                <div>
                    <input
                        className='AddFormInput'
                        type='text'
                        name='postTitle'
                        placeholder='Заголовок поста'
                        value={postTitle}
                        onChange={handlerPostTitleChange}
                        required
                    />
                </div>
                <div>
                    <textarea
                        className='addFormInput'
                        name='postDescription'
                        placeholder='Описание поста'
                        value={postDesc}
                        onChange={handlePostDescChange}
                        rows={8}
                        required
                    />
                </div>
                <div>
                    <button className='addPostBtn' type='submit'>
                        Добавить пост
                    </button>
                </div>
            </form>
            <div onClick={() => setShowAddForm(false)} className="overlay"></div>
        </>
    );
};