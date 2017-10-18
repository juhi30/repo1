import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

console.log('YOYOY', typeof App);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
