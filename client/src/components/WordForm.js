import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputFormGroup from './InputFormGroup';
import SelectFormGroup from './SelectFromGroup';
import FileFormGroup from './FileFormGroup';

import { uploadFile, getSignedRequest } from '../services/s3';
class WordForm extends Component {
  constructor(props) {
    super();
    this.state = {
      formData: {
        name: '',
        definition: '',
        synonyms: '',
        imageUrl: '',
        categoryId: '',
        ...props.selectedWord,
      }
    };

    this.handleSubmit = ::this.handleSubmit;
  }

  componentWillMount() {
    const { categories, getCategories } = this.props;
    !categories && getCategories();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { file, signedRequest, url } = this.audioInput;
    if (file) {
      uploadFile({ file, signedRequest, url })
        .then(audioSrc => this.props.onSubmit({ ...this.state.formData, audioSrc }));
      this.setState({ isFileUploading: true });
    }
    else {
      this.props.onSubmit({ ...this.state.formData })
    }
  }

  updateStateValue(key, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: value
      },
    });
  }

  render() {
    const { selectedWord, categories, heading } = this.props;
    const {
      formData: { name, categoryId, definition, synonyms, imageUrl },
      isFileUploading,
    } = this.state;

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
              <FileFormGroup
                ref={(audioInput) => this.audioInput = audioInput}
                className="column column-50"
                label="Audio"
              />
            }
          </div>
            { isFileUploading && <h5>Uploading File. Please wait...</h5> }
          <div className="float-right">
            <Link to="/words" className="button button-clear">Cancel</Link>
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default WordForm;