import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImageSrc = async () => {
      try {
        const imageUrl = await appwriteService.getFilePreview(featuredImage);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImageSrc();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              className='rounded-xl'
            />
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
