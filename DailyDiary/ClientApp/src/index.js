import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import store from './redux/store/store';

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);


// Новый синтаксис вмонтировки приложения 
// import React from 'react';
// import * as ReactDOM from 'react-dom/client';
// import Root from './components/Root';
// import store from './redux/store/store';

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render( <Root store={store}/>)