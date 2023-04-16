import { getAllPosts } from '@/pages/api/service';
import { FACEBOOK_CLONE_ENDPOINT } from '@/pages/consts';
import { addAllPost, selectPost } from '@/public/src/features/postSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post'

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPost);
  useEffect(() => {
    const fetchData = () => {
      getAllPosts()
        .then((response) => {
          console.log(response.data);
          dispatch(addAllPost(response.data));
        });
    };
    fetchData();
    console.log(posts);
  }, []);

  return (
    <div>
      {posts.map((post:any) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts
