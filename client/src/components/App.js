import React, { Component } from 'react';

import Header from './Header';
import Categories from './Categories';
import Words from './Words';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <br/>
        <Categories />
        <br />
        <hr />
        <br />
        <Words />
      </div>
    );
  }
}

export default App;