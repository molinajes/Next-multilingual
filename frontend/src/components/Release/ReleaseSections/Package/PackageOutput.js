import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Waypoint from 'react-waypoint';

import UseCaseOutput from '../UseCase/UseCaseOutput';
import UseCaseDiagram from '../../../Package/UseCaseDiagram';

@inject('uiStore')
@observer
class PackageOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		selectedId: PropTypes.string
	}

	handleWaypointEnter = () => {
		const {uiStore, data} = this.props;
		uiStore.setOutputScrollTo('package',data.persistent_id)
	}

	render() {
		const {data} = this.props;

		const useCases = data.children.map(useCase => {
			return <UseCaseOutput data={useCase} packageNumber={data.number} key={useCase.id}/>
		})

		return (
			<div className="releaseContent__componentGroup" id={"package_" + data.persistent_id}>
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
				<label className="rf-label">Package:</label>
				<h2 className="rf-h2">
					PA-{data.number} {data.name}
				</h2>
				<div className="rf__horizontalRule">
					<h3 className="rf-h3">Use Case Diagram</h3>
				</div>
				
				<div className="releaseContent__componentIndividual">
					<UseCaseDiagram data={data} />
				</div>

				<div className="rf__horizontalRule">
					<h3 className="rf-h3">Use Case Descriptions</h3>
				</div>
				{useCases}
			</div>
		);
	}
}

export default PackageOutput;
