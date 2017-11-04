import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Table from './Table';
import Section from './Section';
import CategoryForm from './CategoryForm';

import api from '../services/api';

class Categories extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedCategory: null,
      categories: [],
    }

    this.getTableRow = this.getTableRow.bind(this);
    this.getListView = this.getListView.bind(this);
    this.getCreateForm = this.getCreateForm.bind(this);
    this.getEditForm = this.getEditForm.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    this.props.getCategories();
  }

  getTableRow(category) {
    const { _id, name, icon } = category;
    const { match } = this.props;
    return (
      <tr key={_id}>
        <td>{name}</td>
        <td>{icon}</td>
        <td>
          <Link to={`${match.url}/${_id}`}>Edit</Link>
        </td>
        <td>
          <a style={{cursor: 'pointer'}} onClick={() => this.delete(category)}>Delete</a>
        </td>
      </tr>
    );
  }

  getListView() {
    const { categories } = this.props;
    return (
      <Section resource="categories">
        { categories &&
            <Table
              colHeadings={['Name', 'Icon', '', '']}
              items={categories}
              renderRow={this.getTableRow}
            />
        }
      </Section>
    );
  }

  getCreateForm() {
    return (
      <CategoryForm heading="Create New Category" onSubmit={this.create} />
    )
  }

  getEditForm({ match }) {
    debugger;
    return (
      <CategoryForm heading="Edit Category" onSubmit={this.update} />
    )
  }

  selectCategory(category) {
    this.setState({
      selectedCategory: category,
    });
  }

  create(category) {
    api.post('categories', { body: category })
      .then(this.hideForm)
      .then(this.props.getCategories)
  }

  update({ _id, name, icon }) {
    api.put(`categories/${_id}`, { body: { name, icon }})
      .then(this.hideForm)
      .then(this.props.getCategories)
  }

  delete({ _id }) {
    api.delete(`categories/${_id}`)
      .then(this.props.getCategories);
  }

  render() {
    const { selectedCategory } = this.state;
    const { categories, match } = this.props;

    return (
      <div>
        <Route path={`${match.url}/`} exact render={this.getListView} />
        <Route path={`${match.url}/new`} render={this.getCreateForm} />
        <Route path={`${match.url}/edit/:category_id`} render={() => (<div>asdsa</div>)} />
      </div>
    );
  }
}

export default Categories;