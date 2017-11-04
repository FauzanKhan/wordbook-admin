import React, { Component } from 'react';

class WordForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      definition: '',
      synonymns: '',
      imageUrl: '',
      audio: null,
      ...props.selectedWord,
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
    const { onCancel, selectedWord } = this.props;
    return (
      <div>
        <h4>
          { selectedWord ?
              `Edit Word: ${selectedCategory.name}`
              : 'Create New Word'
          }
        </h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column column-50">
              <label>Name</label>
              <input type="text"
                value={this.state.name}
                onChange={({target: {value}}) => this.updateStateValue('name', value)}
              />
            </div>
            <div className="column column-50">
              <label>Category</label>
              <select type="text"
                value={this.state.category}
                onChange={({target: {value}}) => this.updateStateValue('category', value)}
              >
                <option>asd</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="column column-50">
              <label>Definition</label>
              <input type="text"
                value={this.state.definition}
                onChange={({target: {value}}) => this.updateStateValue('definition', value)}
              />
            </div>
            <div className="column column-50">
              <label>Synonymns</label>
              <input type="text"
                value={this.state.synonymns}
                onChange={({target: {value}}) => this.updateStateValue('synonymns', value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="column column-50">
              <label>ImageUrl</label>
              <input type="text"
                value={this.state.imageUrl}
                onChange={({target: {value}}) => this.updateStateValue('imageUrl', value)}
              />
            </div>
          </div>
          <div className="float-right">
            <button className="button button-clear" onClick={onCancel}>Cancel</button>
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default WordForm;