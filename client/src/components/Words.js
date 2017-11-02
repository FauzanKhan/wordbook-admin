import React, { Component } from 'react';

import Table from './Table';
import Section from './Section';

class Words extends Component {
  constructor() {
    super();
    this.state = {
      isFormVisible: false,
      words: [{ id: 1, name: 1, icon: 1 }]
    };
    this.getRow = this.getRow.bind(this);
  }

  getRow({ id, name, icon }) {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{icon}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    );
  }

  render() {
    const { words } = this.state;
    return (
      <Section heading="Words">
        <Table
          colHeadings={["id", "name", "icon", "", ""]}
          items={words}
          renderRow={this.getWordRow}
        />
      </Section>
    );
  }
}

export default Words;
