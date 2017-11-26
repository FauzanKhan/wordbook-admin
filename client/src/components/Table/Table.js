import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ colHeadings, items, renderRow }) => (
  <table>
    <thead>
      <tr>{colHeadings.map((heading, i) => (<th key={i}>{heading}</th>))}</tr>
    </thead>
    <tbody>
      {items.map(renderRow)}
    </tbody>
  </table>
);

Table.propTypes = {
  colHeadings: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.array,
  renderRow: PropTypes.func.isRequired,
};

export default Table;
