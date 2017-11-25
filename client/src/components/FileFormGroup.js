import React, { Component } from 'react';

import { getSignedRequest } from '../services/s3';

class FileFormGroup extends Component {
  constructor() {
    super();

    this.handleChange = ::this.handleChange;
  }

  handleChange(value, files) {
    this.file = null;
    const reader = new FileReader();
    const file = files[0];

    reader.onload = () => {
      getSignedRequest(file)
        .then(({ signedRequest, url }) => {
          this.file = file;
          this.signedRequest = signedRequest;
          this.url = url;
        });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <div {...rest}>
        <label>{label}</label>
        <input type="file" onChange={({ target: { value, files } }) => this.handleChange(value, files)} />
      </div>
    );
  }
}

export default FileFormGroup;
