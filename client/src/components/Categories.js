import React, { Component } from 'react';

import Table from './Table';
import Section from './Section';
import CategoryForm from './CategoryForm';

// import api from '../services/api';

class Categories extends Component {
  constructor(props) {
    console.log(props);
    super();
    this.state = {
      isFormVisible: false,
      selected: null,
      categories: props.categories || [],
    }
    this.getRow = this.getRow.bind(this);
    this.create = this.create.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  // componentWillMount() {
  //   this.getCategories();
  // }

  // getCategories() {
  //   api.get('categories')
  //     .then(res => console.log('received categories', res));
  // }

  create() {
    this.setState({
      isFormVisible: true,
      selected: null,
    });
  }

  edit(category) {
    this.setState({
      isFormVisible: true,
      selected: category,
    });
  }

  getRow(category) {
    const { id, name, icon } = category;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{icon}</td>
        <td>
          <a style={{cursor: 'pointer'}} onClick={() => this.edit(category)}>Edit</a>
        </td>
        <td>
          <a style={{cursor: 'pointer'}} onClick={() => this.delete(category)}>Delete</a>
        </td>
      </tr>
    );
  }

  hideForm() {
    this.setState({
      selected: null,
      isFormVisible: false,
    });
  }

  render() {
    const { categories, isFormVisible, selected } = this.state;
    return (
      <Section heading="Categories" shouldRenderHeader={!isFormVisible} onCreate={this.create}>
        { !isFormVisible &&
            <Table
              colHeadings={['Id', 'Name', 'Icon', '', '']}
              items={categories}
              renderRow={this.getRow}
            />
        }
        { isFormVisible && <CategoryForm onCancel={this.hideForm} selectedCategory={selected} /> }
      </Section>
    );
  }
}

export default Categories;