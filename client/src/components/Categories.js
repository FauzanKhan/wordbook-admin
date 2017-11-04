import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

    this.handleSave = ::this.handleSave;
    this.create = ::this.create;
    this.update = ::this.update;
    this.delete = ::this.delete;

    this.getTableRow = ::this.getTableRow;
    this.getListView = ::this.getListView;
    this.getCreateForm = ::this.getCreateForm;
    this.getEditForm = ::this.getEditForm;
    this.selectCategory = ::this.selectCategory;
  }

  componentWillMount() {
    this.props.getCategories();
  }

  selectCategory(category) {
    this.setState({
      selectedCategory: category,
    });
  }

  handleSave() {
    return this.props.getCategories()
      .then(() => this.context.router.history.push('/categories'));
  }

  create(category) {
    api.post('categories', { body: category })
      .then(this.hideForm)
      .then(this.handleSave)
  }

  update({ _id, name, icon }) {
    api.put(`categories/${_id}`, { body: { name, icon }})
      .then(this.hideForm)
      .then(this.handleSave)
  }

  delete({ _id }) {
    api.delete(`categories/${_id}`)
      .then(this.props.getCategories);
  }

  getTableRow(category) {
    const { _id, name, icon } = category;
    const { match } = this.props;
    return (
      <tr key={_id}>
        <td>{name}</td>
        <td>{icon}</td>
        <td>
          <Link to={`${match.url}/edit/${_id}`}>Edit</Link>
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
    const { categoryId } = match.params;
    const selectedCategory = this.props.categories.find(({ _id }) => _id === categoryId );
    return (
      <CategoryForm
        heading={`Edit ${selectedCategory.name} Category`}
        selectedCategory={selectedCategory}
        onSubmit={this.update}
      />
    )
  }

  render() {
    const { selectedCategory } = this.state;
    const { categories, match } = this.props;

    return (
      <div>
        <Route path={`${match.url}/`} exact render={this.getListView} />
        <Route path={`${match.url}/new`} render={this.getCreateForm} />
        { categories && <Route path={`${match.url}/edit/:categoryId`} render={this.getEditForm} /> }
      </div>
    );
  }
}

Categories.contextTypes = {
  router: PropTypes.object,
}

export default Categories;