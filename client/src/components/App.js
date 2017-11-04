import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import WelcomeScreen from './WelcomeScreen';
import Categories from './Categories';
import Words from './Words';
import api from '../services/api';

class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.getCategories = ::this.getCategories;
    this.getWords = ::this.getWords;
  }

  getCategories() {
    return api.get('categories')
      .then(categories => this.setState({ categories }));
  }

  getWords() {
    return api.get('words')
      .then(words => this.setState({words}));
  }

  render() {
    const { categories, words } = this.state;

    const CategoryList = ({ match }) => (
      <Categories
        categories={categories}
        getCategories={this.getCategories}
        match={match}
      />
    );

    const WordList =  ({ match }) => (
      <Words
        words={words}
        categories={categories}
        getWords={this.getWords}
        getCategories={this.getCategories}
        match={match}
      />
    );

    return (
      <Router>
        <div className="container">
          <Header />
          <br/>
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/categories" render={CategoryList} />
          <Route path="/words" render={WordList} />
        </div>
      </Router>
    );
  }
}

export default App;