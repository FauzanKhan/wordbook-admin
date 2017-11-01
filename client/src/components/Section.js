import React from 'react';

const Section = ({ heading, onCreate, shouldRenderHeader = true, children }) => (
  <section>
    { shouldRenderHeader &&
        <header>
          <h4 style={{ display: 'inline' }}>{heading}</h4>
          <button className="button button-outline float-right" onClick={onCreate}>Create New</button>
        </header>
    }
    {children}
  </section>
);

export default Section;