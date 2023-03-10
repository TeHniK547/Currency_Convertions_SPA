import React, { useState } from 'react'; 
import './EditForm.css';
import { ReactComponent as CloseIcon } from '../../../../assets/images/close.svg';
import { setPostsToLocalStorage } from '../../../../utils/helpers';

export const EditForm = ({ setShowEditForm, selectedPost, setSpaPosts, spaPosts }) => {

    const [postTitle, setPostTitle] = useState(selectedPost?.title);
    const [postDesc, setPostDesc] = useState(selectedPost?.description); 

    const handlerPostTitleChange = (e) => {
        setPostTitle(e.target.value)
    }

    const handlePostDescChange = (e) => {
        setPostDesc(e.target.value)
    };

    const editPost = (e) => {
        e.preventDefault();

        const updatedPost = {
            ...selectedPost,
            title: postTitle,
            description: postDesc,
        }

        console.log(updatedPost);

        const updatedPosts = spaPosts.map((post) => {
            if (post.id === updatedPost.id) return updatedPost
            else return post
        })

        setSpaPosts(updatedPosts);
        setPostsToLocalStorage(updatedPosts);
        setShowEditForm(false);
    }

    return (
        <>
            <form className='editPostForm' onSubmit={editPost}>
                <button className='hideBtn' onClick={() => setShowEditForm(false)}>
                    <CloseIcon />
                </button>
                <h2>Редактирование поста</h2>
                <div>
                    <input
                        className='editFormInput'
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
                        className='editFormInput'
                        name='postDescription'
                        placeholder='Описание поста'
                        value={postDesc}
                        onChange={handlePostDescChange}
                        rows={8}
                        required
                    />
                </div>
                <div>
                    <button className='editPostBtn' type='submit'>
                        Сохранить и закрыть
                    </button>
                </div>
            </form>
            <div className="overlay" onClick={() => setShowEditForm(false)}></div>
        </>
    );
};
