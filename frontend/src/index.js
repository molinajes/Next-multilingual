import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';

const elementId = 'react';
window.myapp_container = document.getElementById(elementId);
const loadingScreen = document.getElementById('loading-screen')

let renderKey = 0;

ReactDOM.render(
	<AppContainer>
		<Routes renderKey={renderKey}/>
	</AppContainer>,
	window.myapp_container,
	function() {if (loadingScreen) loadingScreen.parentNode.removeChild(loadingScreen)}
);

if (module.hot) {
	module.hot.accept('./routes/Routes', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		const NextApp = require('./routes/Routes').default;
		renderKey++;
		ReactDOM.render(
			<AppContainer>
				<NextApp renderKey={renderKey}/>
			</AppContainer>,
			window.myapp_container
		);
	});
}
