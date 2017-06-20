import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import ExternalReleasePage from './components/ExternalRelease/ExternalReleasePage';

const elementId = 'react';
window.myapp_container = document.getElementById(elementId);


ReactDOM.render(
	<AppContainer>
		<ExternalReleasePage />
	</AppContainer>,
	window.myapp_container
);

if (module.hot) {
	module.hot.accept('./components/ExternalRelease/ExternalReleasePage', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		const NextApp = require('./components/ExternalRelease/ExternalReleasePage').default;
		ReactDOM.render(
			<AppContainer>
				<NextApp />
			</AppContainer>,
			window.myapp_container
		);
	});
}
