import React, { Component } from 'react';

import Table from './Table';
import Section from './Section';
import CategoryForm from './CategoryForm';

import api from '../services/api';

class Categories extends Component {
  constructor(props) {
    console.log(props);
    super();
    this.state = {
      isFormVisible: false,
      selected: null,
      categories: [],
    }

    this.getCategories = this.getCategories.bind(this);
    this.getRow = this.getRow.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    this.getCategories();
  }

  getCategories() {
    api.get('categories')
      .then(categories => this.setState({ categories }));
  }

  showForm(category) {
    this.setState({
      isFormVisible: true,
      selected: category,
    });
  }

  getRow(category) {
    const { id, name, icon } = category;
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{icon}</td>
        <td>
          <a style={{cursor: 'pointer'}} onClick={() => this.showForm(category)}>Edit</a>
        </td>
        <td>
          <a style={{cursor: 'pointer'}} onClick={() => this.delete(category)}>Delete</a>
        </td>
      </tr>
    );
  }

  hideForm() {
    return this.setState({
      selected: null,
      isFormVisible: false,
    });
  }

  create(category) {
    api.post('categories', { body: category })
      .then(this.hideForm)
      .then(this.getCategories)
  }

  update({ _id, name, icon }) {
    api.put(`categories/${_id}`, { body: { name, icon }})
      .then(this.hideForm)
      .then(this.getCategories)
  }

  delete({ _id }) {
    console.log(_id);
    api.delete(`categories/${_id}`)
      .then(this.getCategories);
  }

  render() {
    const { categories, isFormVisible, selected } = this.state;
    const handleSubmit = selected ? this.update : this.create;
    return (
      <Section heading="Categories" shouldRenderHeader={!isFormVisible} onCreateNew={() => this.showForm()}>
        { !isFormVisible &&
            <Table
              colHeadings={['Name', 'Icon', '', '']}
              items={categories}
              renderRow={this.getRow}
            />
        }
        { isFormVisible &&
            <CategoryForm
              onCancel={this.hideForm}
              onSubmit={handleSubmit}
              selectedCategory={selected}
            />
        }
      </Section>
    );
  }
}

export default Categories;