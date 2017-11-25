import React, { Component } from 'react';
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
    const { heading, selectedCategory } = this.props;
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

export default CategoryForm;
