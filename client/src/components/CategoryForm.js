import React, { Component } from 'react';

class CategoryForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      icon: '',
      ...props.selectedCategory,
    }
  }

  updateStateValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { onCancel, selectedCategory } = this.props;
    return (
      <div>
        <h4>
          { selectedCategory ?
              `Edit Category: ${selectedCategory.name}`
              : 'Create New Category'
          }
        </h4>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text"
            value={this.state.name}
            onChange={({target: {value}}) => this.updateStateValue('name', value)}
          />

          <label>Icon</label>
          <input type="text"
            value={this.state.icon}
            onChange={({target: {value}}) => this.updateStateValue('icon', value)}
          />

          <div className="float-right">
            <button className="button button-clear" onClick={onCancel}>Cancel</button>
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CategoryForm;