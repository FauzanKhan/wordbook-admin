import React, { Component } from 'react';

import Table from './Table';
import Section from './Section';
import WordForm from './WordForm';

import api from '../services/api';

class Words extends Component {
  constructor() {
    super();
    this.state = {
      isFormVisible: false,
      selectedWord: null,
      words: [],
    }

    this.getWords = this.getWords.bind(this);
    this.getRow = this.getRow.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  getRow({ name, definition, synonmymns, imageUrl, audio }) {
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{definition}</td>
        <td>{synonmymns}</td>
        <td><img src={imageUrl} /></td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    );
  }

  getWords() {
    api.get('words')
      .then(words => this.setState({ words }));
  }

  showForm(word) {
    this.setState({
      isFormVisible: true,
      selectedWord: word,
    });
  }

  hideForm() {
    return this.setState({
      selectedWord: null,
      isFormVisible: false,
    });
  }

  create(word) {
    api.post('words', { body: word })
      .then(this.hideForm)
      .then(this.getWords)
  }

  update({ _id, name, icon }) {
    api.put(`words/${_id}`, { body: { name, icon }})
      .then(this.hideForm)
      .then(this.getWords)
  }

  delete({ _id }) {
    api.delete(`words/${_id}`)
      .then(this.getWords);
  }

  render() {
    const { words, isFormVisible, selectedWord } = this.state;
    const handleSubmit = selectedWord ? this.update : this.create;
    return (
      <Section heading="Words" shouldRenderHeader={!isFormVisible} onCreateNew={() => this.showForm()}>
        { isFormVisible
          ? <WordForm
              onCancel={this.hideForm}
              onSubmit={handleSubmit}
              selectedWord={selectedWord}
            />
          : <Table
              colHeadings={["Audio", "Name", "definition", "Synonymns", "Image"]}
              items={words}
              renderRow={this.getRow}
            />
        }
      </Section>
    );
  }
}

export default Words;
