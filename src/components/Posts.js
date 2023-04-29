import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '../redux/slices/postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  if (status === 'loading') {
    return <div>Loading posts...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <h1>Posts</h1>
      <table id="posts">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ?
            <>
              {posts.map((post, i) => (
                <tr key={post.id}>
                  <td>{i + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <button onClick={() => handleDelete(post.id)}>Delete</button> {/* Add a delete button */}
                  </td>
                </tr>
              ))}
            </>
            :
            <tr>
              <td colSpan="4" className='no-data'>No data available</td>
            </tr>
          }
        </tbody>
      </table>
    </div>

  );
};

export default Posts;
