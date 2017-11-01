import React from 'react';

const Section = ({ heading, onCreateNew, shouldRenderHeader = true, children }) => (
  <section>
    { shouldRenderHeader &&
        <header>
          <h4 style={{ display: 'inline' }}>{heading}</h4>
          <button className="button button-outline float-right" onClick={onCreateNew}>Create New</button>
        </header>
    }
    {children}
  </section>
);

export default Section;