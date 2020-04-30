import '../assets/style.scss';

import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './components/App';

const appElement = document.getElementById('app') || document.createElement('div');
if (appElement.hasChildNodes()) {
  hydrate(<App />, appElement);
} else {
  render(<App />, appElement);
}
