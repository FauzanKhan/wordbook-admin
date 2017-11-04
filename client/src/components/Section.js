import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ resource, children }) => (
  <section>
    <header>
      <h4 style={{ display: 'inline' }}>{resource}</h4>
      <Link to={`/${resource}/new`} className="button button-outline float-right">Add new {resource}</Link>
    </header>
    {children}
  </section>
);

export default Section;