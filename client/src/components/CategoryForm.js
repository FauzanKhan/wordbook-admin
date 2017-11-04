import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class CategoryForm extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      name: '',
      icon: '',
      ...props.selectedCategory,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  updateStateValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { heading, selectedCategory } = this.props;
    // { selectedCategory ?
    //   `Edit Category: ${selectedCategory.name}`
    //   : 'Create New Category'
    // }
    return (
      <div>
        <h4>{heading}</h4>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text"
            value={this.state.name}
            onChange={({ target: { value }}) => this.updateStateValue('name', value)}
          />

          <label>Icon</label>
          <input type="text"
            value={this.state.icon}
            onChange={({ target: { value}}) => this.updateStateValue('icon', value)}
          />

          <div className="float-right">
            <Link to="/categories" className="button button-clear">Cancel</Link>
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CategoryForm;