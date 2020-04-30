import '../assets/style.scss';

import '../assets/favicon/favicon.ico';
import '../assets/favicon/apple-touch-icon.png';
import '../assets/favicon/favicon-16x16.png';
import '../assets/favicon/favicon-32x32.png';
import '../assets/favicon/foldoverstories.webmanifest';
import '../assets/favicon/android-chrome-192x192.png';
import '../assets/favicon/android-chrome-512x512.png';
import '../assets/sitemap.xml';

import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './components/App';

const appElement = document.getElementById('app') || document.createElement('div');
if (appElement.hasChildNodes()) {
  hydrate(<App />, appElement);
} else {
  render(<App />, appElement);
}
