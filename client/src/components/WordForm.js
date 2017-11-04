import React, { Component } from 'react';

import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFromGroup';
class WordForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      definition: '',
      synonyms: '',
      imageUrl: '',
      audioFileName: '',
      categoryId: '',
      ...props.selectedWord,
    };

    this.handleFileChange = ::this.handleFileChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  componentWillMount() {
    const { categories, getCategories } = this.props;
    !categories && getCategories();
  }

  handleFileChange(value, files) {
    const reader = new FileReader();
    const file = files[0];

    reader.onload = (upload) => {
      this.setState({
        audio: upload.target.result,
        audioFileName: file.name,
      }, () => console.log(this.state));
    };

    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger;
    this.props.onSubmit(this.state);
  }

  updateStateValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { selectedWord, categories, heading } = this.props;
    const { name, categoryId, definition, synonyms, imageUrl } = this.state;

    return (
      <div>
        <h4>{heading}</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <InputFormGroup
              className="column column-50"
              label="Word"
              value={name}
              onChange={(value) => this.updateStateValue('name', value)}
            />
            { categories &&
                <SelectFormGroup
                  className="column column-50"
                  label="Category"
                  value={categoryId}
                  options={categories}
                  onChange={(value) => this.updateStateValue('categoryId', value)}
                />
            }
          </div>

          <div className="row">
            <InputFormGroup
              className="column column-50"
              label="Definition"
              value={definition}
              onChange={(value) => this.updateStateValue('definition', value)}
            />
            <InputFormGroup
              className="column column-50"
              label="Synonymns"
              value={synonyms}
              onChange={(value) => this.updateStateValue('synonyms', value)}
            />
          </div>

          <div className="row">
            <InputFormGroup
              className="column column-50"
              label="ImageUrl"
              value={imageUrl}
              onChange={(value) => this.updateStateValue('imageUrl', value)}
            />
            {
              <div className="column column-50">
                <label>Audio</label>
                <input type="file" onChange={({ target: { value, files }}) => this.handleFileChange( value, files)} />
              </div>
            }
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