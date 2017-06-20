import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {observer} from 'mobx-react';

@observer
class TransitionsTest extends Component {
	static propTypes = {
		
	}

	render() {
		return (
			<div>
				<ReactCSSTransitionGroup
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					<h1>Fading at Initial Mount</h1>
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default TransitionsTest;
