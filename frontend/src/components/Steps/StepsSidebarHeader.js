import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import IconicIcon from '../Iconic/IconicIcon';
import UseCaseTitle from '../UseCase/UseCaseTitle';
import UseCaseDescription from '../UseCase/UseCaseDescription';
import UseCaseDelete from '../UseCase/UseCaseDelete';

@observer
class StepsSidebarHeader extends Component {
	static propTypes = {
		useCaseData: PropTypes.object.isRequired
	}

	render() {
		const {useCaseData} = this.props;
		return (
			<div className="stepsSidebarHeader__header">
				<div className="stepsSidebarHeader__prompts">
					<div className="stepsSidebarHeader__prompt">
						Steps in the Use Case
					</div>
					{/*<div className="stepsSidebarHeader__prompt">
						Linked Requirements
					</div>*/}
					<div className="stepsSidebarHeader__prompt">
						{/*Describe this Use Case*/}
					</div>
					<UseCaseDelete useCaseId={useCaseData.persistent_id}/>
				</div>
				<div className="stepsSidebarHeader__details">
					<div className="stepsSidebarHeader__name">
						<IconicIcon dataSrc={"fire-sm"} iconClass={".stepsSidebarHeader__nameIcon"} />
						<UseCaseTitle useCaseData={useCaseData} />
					</div>
					<div className="stepsSidebarHeader__linked">
						<IconicIcon dataSrc={"link-intact-sm"} iconClass={"stepsSidebarHeader__nameIcon"} />
					</div>
					<div className="stepsSidebarHeader__description">
						<UseCaseDescription useCaseData={useCaseData} />
					</div>
				</div>
			</div>
		);
	}
}

export default StepsSidebarHeader;
