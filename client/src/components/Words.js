import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from './Table';
import Section from './Section';
import WordForm from './WordForm';

import api from '../services/api';

class Words extends Component {
  constructor() {
    super();
    this.state = {}

    this.create = ::this.create;
    this.update = ::this.update;
    this.delete = ::this.delete;
    this.selectWord = ::this.selectWord;
    this.onSaveSuccess = ::this.onSaveSuccess;
    this.changeCurrentAudio = ::this.changeCurrentAudio;
    this.clearCurrentAudio = ::this.clearCurrentAudio;

    this.getTableRow = ::this.getTableRow;
    this.getListView = ::this.getListView;
    this.getCreateForm = ::this.getCreateForm;
    this.getEditForm = ::this.getEditForm;
  }

  componentWillMount() {
    this.props.getWords();
    this.props.getCategories();
  }

  create(word) {
    api.post('words', { body: word })
      .then(this.onSaveSuccess)
  }

  update(word) {
    const { _id } = word;
    api.put(`words/${_id}`, { body: word })
      .then(this.onSaveSuccess)
  }

  delete({ _id }) {
    api.delete(`words/${_id}`)
      .then(this.props.getWords);
  }

  selectWord(word) {
    this.setState({
      selectedWord: word,
    });
  }

  onSaveSuccess() {
    return this.props.getWords()
      .then(() => this.context.router.history.push('/words'));
  }

  changeCurrentAudio(_id, audioSrc) {
    const { currentAudioId } = this.state;
    this.setState({
      currentAudioSource: currentAudioId === _id ? null : audioSrc,
      currentAudioId: currentAudioId === _id ? null : _id,
    });
  }

  clearCurrentAudio() {
    this.setState({
      currentAudioSource: null,
      currentAudioId: null,
    });
  }

  getTableRow(word) {
    const { _id, name, definition, synonyms, imageUrl, audioSrc, category } = word;
    const { match } = this.props;
    const categoryName = category[0] && category[0].name;
    const [ audioFileName, ...rest ] = audioSrc ? audioSrc.split('/').reverse() : [];

    return (
      <tr key={_id}>
        <td>
          <a role="button" style={{ cursor: 'pointer' }} onClick={() => this.changeCurrentAudio(_id, audioSrc)}>&#9658;</a>
          <span>{audioFileName}</span>
        </td>
        <td>{name}</td>
        <td>{categoryName}</td>
        <td>{definition}</td>
        <td>{synonyms}</td>
        <td><img height="50px" width="50px" style={{objectFit: 'cover'}} src={imageUrl} /></td>
        <td>
          <Link to={`${match.url}/edit/${_id}`}>Edit</Link>
        </td>
        <td>
          <a style={{cursor: 'pointer'}} onClick={() => this.delete(word)}>Delete</a>
        </td>
      </tr>
    );
  }

  getListView() {
    const { words } = this.props;

    return (
      <Section resource="words">
        { words &&
            <Table
              colHeadings={['Audio', 'Name', 'Category', 'Definition', 'Synonyms', 'Image', '', '']}
              items={words}
              renderRow={this.getTableRow}
            />
        }
      </Section>
    );
  }

  getCreateForm() {
    const { categories, getCategories } = this.props;

    return (
      <WordForm
        heading="Add New Word"
        getCategories={getCategories}
        categories={categories}
        onSubmit={this.create}
      />
    )
  }

  getEditForm({ match }) {
    const { wordId } = match.params;
    const { categories, words, getCategories } = this.props;
    const selectedWord = words.find(({ _id }) => _id === wordId );

    return (
      <WordForm
        heading={`Edit ${selectedWord.name} Word`}
        getCategories={getCategories}
        categories={categories}
        selectedWord={selectedWord}
        onSubmit={this.update}
      />
    )
  }

  render() {
    const { selectedWord, currentAudioSource } = this.state;
    const { words, match } = this.props;

    return (
      <div>
        <Route path={`${match.url}/`} exact render={this.getListView} />
        <Route path={`${match.url}/new`} render={this.getCreateForm} />
        { words && <Route path={`${match.url}/edit/:wordId`} render={this.getEditForm} /> }
        { currentAudioSource && <audio src={currentAudioSource} onEnded={this.clearCurrentAudio} autoPlay />}
      </div>
    );
  }
}

Words.contextTypes = {
  router: PropTypes.object,
}

export default Words;
