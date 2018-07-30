import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect} from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import { searchRobots } from './reducers'
import 'tachyons';


const store = createStore(searchRobots);
// Wrap app component in provider so you dont need to provide store 
// Everything 

ReactDOM.render(
		<Provider store={store}>
			<App /> 
		</Provider>, document.getElementById('root'));
registerServiceWorker();

