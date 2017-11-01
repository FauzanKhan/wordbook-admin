import React from 'react';
import render from 'react-dom';

import App from './components/App';

document.onload = () => render(<App />, document.getElementById('render-target'));