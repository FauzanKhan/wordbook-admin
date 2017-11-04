import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header>
    <nav className="clearfix">
      <div className="float-left"><h3>Voca<b>Book</b></h3></div>
      <div className="float-right">
        <Link to="/categories" style={{padding: '0 20px', fontSize: '20px'}}>Categories</Link>
        <Link to="/words" style={{fontSize: '20px'}}>Words</Link>
      </div>
    </nav>
  </header>
);