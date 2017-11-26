import React from 'react';
import { Link } from 'react-router-dom';


const Welcome = () => (
  <div style={{ textAlign: 'center', marginTop: '100px' }}>
    <h3>Hello, What would you like to work on today?</h3>
    <Link to="/categories" className="button" style={{ margin: '20px 15px' }}>Categories</Link>
    <Link to="/words" className="button button-outline" style={{ margin: '20px 15px' }}>Words</Link>
  </div>
);

export default Welcome;
