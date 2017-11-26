import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import InputFormGroup from './InputFormGroup';

class CategoryForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      icon: '',
      ...props.selectedCategory,
    };
    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  updateStateValue(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { heading } = this.props;
    const { name, icon } = this.state;

    return (
      <div>
        <h4>{heading}</h4>
        <form onSubmit={this.handleSubmit}>
          <InputFormGroup
            label="Name of the category"
            value={name}
            onChange={value => this.updateStateValue('name', value)}
          />

          <InputFormGroup
            label="Icon"
            value={icon}
            onChange={value => this.updateStateValue('icon', value)}
          />

          <div className="float-right">
            <Link to="/categories" className="button button-clear">Cancel</Link>
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedCategory: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
  heading: PropTypes.string,
};

CategoryForm.defaultProps = {
  selectedCategory: undefined,
  heading: 'Category Form',
};

export default CategoryForm;
