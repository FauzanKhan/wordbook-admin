import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Section = ({ resource, children }) => (
  <section>
    <header>
      <h4 style={{ display: 'inline' }}>{resource}</h4>
      <Link to={`/${resource}/new`} className="button button-outline float-right">{`Add New ${resource}`}</Link>
    </header>
    {children}
  </section>
);

Section.propTypes = {
  resource: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Section;
