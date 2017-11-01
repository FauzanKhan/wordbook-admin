import React from 'react';

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

export default Table;