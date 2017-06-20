import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import ModuleTitle from './ModuleTitle';
import ModuleCreate from './ModuleCreate';




@inject('requirementStore', 'uiStore')
@observer
class ModuleList extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		/*uiStore: PropTypes.object.isRequired*/
	}

	render() {
		const {requirementStore, /*uiStore*/} = this.props;

		let moduleTitles = null;
		moduleTitles = requirementStore.groupData.map((moduleTitle, index) => {
			return <ModuleTitle firstChild={index === 0} groupData={moduleTitle} key={`${moduleTitle.id}`} />
		})

		return ( 
			<div className="moduleList__container">
				{moduleTitles}
				<ModuleCreate renderPosition={"ModuleList"} />
				<div className="moduleList__helpText">
					Define your modules to group your requirements and details.
				</div>
			</div>
		);
	}
}

export default ModuleList;
