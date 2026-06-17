import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Oops! It looks like you've wandered off the trail.</p>
      <Link to="/" className="btn btn-primary">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
