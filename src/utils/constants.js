import postImage from '../assets/images/postImage.jpg'

export const POSTS = [
  {
    id: 1,
    title: 'Post 1',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ining Lorem Ipsum passages',
    liked: false,
    image: postImage,
  },
  {
    id: 2,
    title: 'Post 2',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ining Lorem Ipsum passages',
    liked: false,
    image: postImage,
  },
  {
    id: 3,
    title: 'Post 3',
    description: 'Lorem Ipsum is simply dummy ',
    liked: false,
    image: postImage,
  },
];

export const POSTS_URL = 'https://640af21e65d3a01f980b87b8.mockapi.io/posts/';

export const APP_ROUTES = [
  '/',
  '/news',
  '/favourite',
  '/login',
  '/currency',
  '/settings',
  '/:id',
]
