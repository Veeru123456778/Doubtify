// Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 ${loading ? 'block' : 'hidden'}`}>
      <ClipLoader color="#3498db" loading={loading} size={50} />
    </div>
  );
};

export default Loader;
