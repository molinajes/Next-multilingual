import React, { Component, PropTypes } from 'react';
import {Router, Route, Redirect, browserHistory} from 'react-router';

import ExternalRelease from '../components/ExternalRelease/ExternalReleasePage';

/*import IndexPage from '../components/IndexPage/IndexPage'
import CreateProject from '../components/CreateProject/CreateProject';
import CreateIndex from '../components/CreateProject/CreateIndex';
import CreateProjectDetails from '../components/CreateProject/CreateProjectDetails';
import ProjectPage from '../components/ProjectPage/ProjectPage';
import Gather from '../components/Gather/Gather';
import ComponentPage from '../components/Component/ComponentPage';
import Model from '../components/Model/Model';
import Release from '../components/Release/Release';*/

const prefix = "/";

class Routes extends Component {

	static propTypes = {
		renderKey: PropTypes.number.isRequired
	}

	render() {
		return (
			<Router history={browserHistory} onUpdate={hashLinkScroll}>
				<Route component={ExternalRelease} path={prefix} />
				<Redirect from="/app" to="/" />
			</Router>
		);
	}
}

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

export default Routes;
