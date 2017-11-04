import React, { Component } from 'react';

class WordForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      definition: '',
      synonyms: '',
      imageUrl: '',
      audio: null,
      categoryId: '',
      ...props.selectedWord,
    };
    console.log(this.state);

    this.handleSubmit = ::this.handleSubmit;
  }

  componentWillMount() {
    const { categories, getCategories } = this.props;
    !categories && getCategories();
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
    const { selectedWord, categories, heading } = this.props;

    return (
      <div>
        <h4>{heading}</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column column-50">
              <label>Name</label>
              <input type="text"
                value={this.state.name}
                onChange={({target: {value}}) => this.updateStateValue('name', value)}
              />
            </div>
            { categories &&
              <div className="column column-50">
                <label>Category</label>
                <select type="text"
                  value={this.state.categoryId}
                  onChange={({target: {value}}) => this.updateStateValue('categoryId', value)}
                >
                  <option defaultChecked hidden>Select</option>
                  {
                    categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))
                  }
                </select>
              </div>
            }
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
                value={this.state.synonyms}
                onChange={({target: {value}}) => this.updateStateValue('synonyms', value)}
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
            <button className="button button-clear">Cancel</button>
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default WordForm;