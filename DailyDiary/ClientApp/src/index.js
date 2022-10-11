import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
//import store from './redux/store/store';
// import { createStore }  from 'redux'
import { Provider } from 'react-redux';
import store from './redux/store/store';
import i18next, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import './styles/index.css'

i18next
  .use(initReactI18next)
  .init({
  lng: document.querySelector('html').lang, 
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    },
    fr: {
      translation: {
        "key": "Bonjour le monde"
      }
    }
  }
});

export function RootMain() {
  const { trans } = useTranslation();

  return(
    <>
      <h2>{ trans('key') }</h2>
    </>
  )
}

// async function GetAllGroups(){
//   const response = await fetch(`https://localhost:44364/api/group/get`)
//   const data = await response.json()
//   return data
// }

// const reducer = (state, action) => {
//   const response = fetch(`https://localhost:44364/api/group/get`)
//   const data = GetAllGroups()
//   state = {
//     groups: [{title: "PV-911"}]
//   } //[{title: "PV-911"}]

//   switch(action.type) {
    
//     case "Add":

//       break

//     default: 
//       return state
//   }
// }

// const store = createStore(reducer)

// ReactDOM.render(
//   <Root store={store}/>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root')
);


// Новый синтаксис вмонтировки приложения REACT 18
// import React from 'react';
// import * as ReactDOM from 'react-dom/client';
// import Root from './components/Root';
// import store from './redux/store/store';

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render( <Root store={store}/>)