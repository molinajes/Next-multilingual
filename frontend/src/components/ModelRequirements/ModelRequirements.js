import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconicIcon from '../Iconic/IconicIcon';

import RequirementsList from './RequirementsList';

@inject('uiStore','requirementStore')
@observer
class ModelRequirements extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired
	}

	showUseCaseEditor = () => {
		const { uiStore } = this.props;
		uiStore.setModelPageFocus('showUseCaseEditor');
	}

	showRequirements = () => {
		const { uiStore } = this.props;
		uiStore.setModelPageFocus('showRequirements');
	}

	render() {
		const { uiStore, requirementStore} = this.props;
		const expanded = uiStore.modelPageFocus === 'showRequirements';
		
		if (expanded) {
			return (
				<div className="model__ModelRequirementsFrame">
					<div className="model__ModelRequirementsBanner" onClick={this.showUseCaseEditor}>
						<IconicIcon dataSrc={"link-intact-sm"} iconClass={"componentView__bannerIcons"} />
						Link your requirements
					</div>
					<RequirementsList />
				</div>
			);
		}
		else {
			return (
				<div className="model__ModelRequirementsFrame frame--collapsed" onClick={this.showRequirements}>
					<div className="model__ModelRequirementsBanner" >
						<IconicIcon dataSrc={"link-intact-sm"} iconClass={"componentView__bannerIcons"} />
					</div>
					<div className="model__groupCollapsed--ModelRequirements">
						<IconicIcon dataSrc={'grid-four-up-sm'} iconClass={'requirement__type__icon'} />
						{requirementStore.groupData.length}
						<IconicIcon dataSrc={'chat-sm'} iconClass={'requirement__type__icon'} />
						{requirementStore.requirementData.length}
						<IconicIcon dataSrc={'screenshot-sm'} iconClass={'requirement__type__icon'} />
						{requirementStore.detailData.length}
					</div>
				</div>
			);
		}
	}
}

export default ModelRequirements;
