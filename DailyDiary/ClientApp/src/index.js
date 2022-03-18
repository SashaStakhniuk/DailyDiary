import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import store from './redux/store/store';

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
