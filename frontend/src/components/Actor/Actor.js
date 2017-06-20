import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

@observer
class Actor extends Component {
	static propTypes = {
		actorData: PropTypes.object.isRequired
	}

	render() {
		const {actorData} = this.props;
		return (
			<div className="actor__container">
				<div className="actor__picture" ref={(actor) => this.actorRef = actor}></div>
				<div className="actor__name">{actorData.name}</div>
			</div>
		);
	}
}

export default Actor;
