import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

// import Waypoint from 'react-waypoint';

import ObjectOutput from './Object/ObjectOutput';

@inject('componentStore', 'uiStore')
@observer
class ReleaseObjects extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
	}

	/*handleWaypointEnter = () => {
		const {uiStore} = this.props;
		uiStore.setOutputScrollTo('objects','')
	}
	handleWaypointLeave = () => {
		const {uiStore} = this.props;
		uiStore.setOutputScrollTo('','')
	}*/

	render() {
		const {componentStore} = this.props;

		const objects = componentStore.componentData.object.map(object => {
			return <ObjectOutput data={object} key={object.id}/>
		})

		if (objects.length === 0) {
			// Don't output if there are no objects
			return null;
		}

		return (
			<div className="releaseContent__container" id="objects">
				<h1 className="reqModel__title rf-h1">Objects</h1>
				<label className="rf-label">Objects:</label>
				<p className="rf-p">Objects things that are used by the application, like customers, or bookings.</p>
				{objects}
			</div>
		);
	}
}

export default ReleaseObjects;
