import React, { useState } from 'react'; 
import './EditForm.css';
import { ReactComponent as CloseIcon } from '../../../assets/images/close.svg';
import { POSTS_URL } from '../../../utils/constants';

export const EditForm = ({ 
    setShowEditForm, 
    setSpaPost, 
    spaPost,
    setSpaPosts,
}) => {

    const [postTitle, setPostTitle] = useState(spaPost?.title);
    const [postDesc, setPostDesc] = useState(spaPost?.description); 

    const handlerPostTitleChange = (e) => {
        setPostTitle(e.target.value)
    }

    const handlePostDescChange = (e) => {
        setPostDesc(e.target.value)
    };

    const editPost = (e) => {
        e.preventDefault();

        const updatedPost = {
            ...spaPost,
            title: postTitle,
            description: postDesc,
        };

        fetch(POSTS_URL + spaPost.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost),
        })
            .then(res => res.json())
            .then(updatedPostFromServer => {
                setSpaPost(updatedPostFromServer)
                setSpaPosts((spaPosts) => {
                    return spaPosts.map(post => {
                        if (post.id === updatedPostFromServer.id) {
                            return updatedPostFromServer
                        }
        
                        return post
                    })
                });
                setShowEditForm(false);
            })
            .catch((error) => console.log(error))
    };

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
