import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'Hot Dog';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('root'),
);

module.hot.accept();
