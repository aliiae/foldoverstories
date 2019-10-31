import React from 'react';
import BulmaFooter from 'react-bulma-components/lib/components/footer';


function Footer() {
  return (
    <BulmaFooter renderAs="footer" className="has-text-centered">
      Copyright 2019
      {new Date().getFullYear() > 2019 && document.write(`-${new Date().getFullYear()}`)}
      {' '}
      &copy;
      {' '}
      Fold-over Stories.
      {' '}
      <a href="mailto:contact@foldoverstories.com">Contact</a>
      .
    </BulmaFooter>
  );
}

export default React.memo(Footer);
