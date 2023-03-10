export const setPostsToLocalStorage = (updatePosts) => {
    localStorage.setItem('spaPosts', JSON.stringify(updatePosts));
  };