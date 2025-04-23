import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Community.css';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [profileName, setProfileName] = useState('Anonymous');

  // Fetch latest profile for author name
  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/profile/get-profile');
      if (res.data.profile) {
        setProfileName(res.data.profile.name);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  const handlePost = async () => {
    if (!newPost) return alert('Please enter something to post!');
    try {
      const newPostObject = {
        title: newPost,
        content: '', // You can extend this if needed
        author: profileName
      };
      await axios.post('http://localhost:5000/api/posts', newPostObject);
      setNewPost('');
      fetchPosts(); // Refresh posts
    } catch (err) {
      console.error('Failed to post:', err);
    }
  };

  return (
    <div className="main-container">
      <h1>Women's Community</h1>

      {/* Search */}
      <div className="input-group">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="input-field"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Create Post */}
      <div className="input-group">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your thoughts..."
          className="input-field"
          rows="2"
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </div>

      {/* Posts */}
      <div className="posts-container">
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-meta">
                <span>Author: {post.author}</span>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
